/**
 *
 * A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * by Sumit Kumar (@TweetsOfSumit)
 * Github Repo: https://github.com/codeofsumit/leaflet.pm
 */

import './polyfills';
import { version } from '../../package.json';

import Map from './L.PM.Map';

import Draw from './Draw/L.PM.Draw';
import './Draw/L.PM.Draw.Line';

import Edit from './Edit/L.PM.Edit';
import './Edit/L.PM.Edit.LayerGroup';
import './Edit/L.PM.Edit.Line';

import '../css/layers.css';
import '../css/controls.css';

L.PM = L.PM || {
    Map,
    Draw,
    Edit,
    version,
    initialize() {
        this.addInitHooks();
    },
    addInitHooks() {
        function initMap() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Map(this);
            }
        }

        L.Map.addInitHook(initMap);

        function initLayerGroup() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        }

        L.LayerGroup.addInitHook(initLayerGroup);

        function initPolyline() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Line(this);
            }
        }

        L.Polyline.addInitHook(initPolyline);
    },
};

// initialize leaflet.pm
L.PM.initialize();
