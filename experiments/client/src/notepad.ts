import { api as prague, ui as pragueUi } from "@prague/routerlicious";
import * as electron from "electron";
import { TokenGenerator } from "./tokenGenerator";

// For local development
const routerlicious = "https://alfred.wu2.prague.office-int.com";
const historian = "https://historian.wu2.prague.office-int.com";
const tenantId = "suspicious-northcutt";

// Get a token generator
const secret = "86efe90f7d9f5864b3887781c8539b3a";
const generator = new TokenGenerator(tenantId, secret);

// Register endpoint connection
prague.socketStorage.registerAsDefault(routerlicious, historian, tenantId);

async function run(id: string): Promise<void> {
    const token = generator.generate(id);

    const host = new pragueUi.ui.BrowserContainerHost();

    // Load in the latest and connect to the document
    const collabDoc = await prague.api.load(id, { blockUpdateMarkers: true, token });

    const rootView = await collabDoc.getRoot().getView();
    console.log("Keys");
    console.log(rootView.keys());

    // Add in the text string if it doesn't yet exist
    if (!collabDoc.existing) {
        const newString = collabDoc.createString() as prague.SharedString.SharedString;
        const starterText = " ";
        const segments = prague.MergeTree.loadSegments(starterText, 0, true);
        for (const segment of segments) {
            if (segment.getType() === prague.MergeTree.SegmentType.Text) {
                const textSegment = segment as prague.MergeTree.TextSegment;
                newString.insertText(textSegment.text, newString.client.getLength(),
                    textSegment.properties);
            } else {
                // assume marker
                const marker = segment as prague.MergeTree.Marker;
                newString.insertMarker(newString.client.getLength(), marker.refType, marker.properties);
            }
        }

        rootView.set("presence", collabDoc.createMap());
        rootView.set("text", newString);
        rootView.set("ink", collabDoc.createMap());
        rootView.set("pageInk", collabDoc.createStream());
    } else {
        await Promise.all([rootView.wait("text"), rootView.wait("ink")]);
    }

    // Load the text string and listen for updates
    const text = rootView.get("text");
    const ink = rootView.get("ink");

    const image = new pragueUi.controls.Image(
        document.createElement("div"),
        "https://alfred.wu2.prague.office-int.com/public/images/bindy.svg");

    const textElement = document.getElementById("text") as HTMLDivElement;
    const container = new pragueUi.controls.FlowContainer(
        textElement,
        collabDoc,
        text,
        ink,
        image,
        rootView.get("pageInk"),
        {});
    const theFlow = container.flowView;
    host.attach(container);

    if (text.client.getLength() > 0) {
        theFlow.render(0, true);
    }

    const clockStart = Date.now();
    theFlow.timeToEdit = theFlow.timeToImpression = Date.now() - clockStart;
    theFlow.setEdit(rootView);

    text.loaded.then(() => {
        theFlow.loadFinished(clockStart);
    });
}

electron.ipcRenderer.on("load-note", (event, id) => {
    run(id);
});
