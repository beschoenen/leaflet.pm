import * as L from "leaflet";

// Type definitions for leaflet.pm 0.13
// Project: https://github.com/codeofsumit/leaflet.pm
// Definitions by: Thomas Kleinke <https://github.com/tkleinke>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module "leaflet" {

    interface Map {
        pm: PM.Map;
    }

    interface LayerGroup {
        pm: PM.Edit.LayerGroup;
    }

    interface Polyline {
        pm: PM.Edit.Line;
    }

    namespace PM {
        const version: string;

        namespace Events {
            interface Event {
                type: string;
                sourceTarget: any;
                target: any;
                shape: string;
            }

            interface DrawStart extends Event {
                workingLayer: L.Layer;
            }

            interface DrawEnd extends Event {}

            interface VertexAdded extends Event {
                latlng: L.LatLng;
                marker: L.Marker;
                workingLayer: L.Layer;
            }
        }

        interface DrawOptions {
            cursorMaker?: boolean;
            finishOnDoubleClick?: boolean;
            templineStyle?: L.PathOptions;
            hintlineStyle?: L.PathOptions;
            pathOptions?: L.PathOptions;
        }

        interface EditOptions {}

        interface Map {
            map: L.Map;
            Draw: Draw;

            enableDraw(shape?: string, options?: DrawOptions): void;
            disableDraw(shape?: string): void;
            removeLastVertex(shape?: string): void;
            setPathOptions(options: L.PathOptions): void;
            removeLayer(e: Events.Event): void;
            toggleGlobalRemovalMode(): void;
            globalRemovalEnabled(): boolean;
            globalEditEnabled(): boolean;
            enableGlobalEditMode(options?: DrawOptions): void;
            disableGlobalEditMode(): void;
            toggleGlobalEditMode(options?: DrawOptions): void;
        }

        class Draw {
            setPathOptions(options: L.PathOptions): void;
            getShapes(): string[];
            enable(shape: string, options?: DrawOptions): void;
            disable(): void;
            removeLastVertex(shape: string): void;
        }

        namespace Draw {
            class Line extends PM.Draw {
                // enable(options?: DrawOptions): void;
                enabled(): boolean;
                toggle(options?: DrawOptions): void;
                hasSelfIntersection(): boolean;
            }
        }

        class Edit {
            enable(options?: EditOptions): void;
            disable(): void;
            toggleEdit(options?: EditOptions): void;
            enabled(): boolean;
            isPolygon(): boolean;
        }

        namespace Edit {
            class LayerGroup extends PM.Edit {
                findLayers(): L.Layer[];
                dragging(): boolean;
                getOptions(): EditOptions;
            }

            class Line extends PM.Edit {
                hasSelfIntersection(): boolean;
                updatePolygonCoordsFromMarkerDrag(marker: L.Marker): void;
                findMarkerIndex(markers: L.Marker[], marker: L.Marker): { index: number, ringIndex: number };
                removeLastVertex(isDrawing?: boolean): boolean;
            }
        }
    }
}
