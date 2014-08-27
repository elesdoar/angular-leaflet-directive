/*! Esri-Leaflet - v0.0.1-beta.4 - 2014-02-24
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Apache License*/
!function(L){L.esri.ClusteredFeatureLayer=L.Class.extend({includes:L.esri.Mixins.featureGrid,options:{cellSize:512,debounce:100,deduplicate:!0,where:"1=1",fields:["*"],createMarker:function(a,b){return new L.marker(b)},onEachMarker:void 0},initialize:function(a,b){this.url=L.esri.Util.cleanUrl(a),L.Util.setOptions(this,b),this._getMetadata(),this._loaded=[],this.cluster=this.options.cluster||new L.MarkerClusterGroup},onAdd:function(a){this.cluster.addTo(a),this._initializeFeatureGrid(a)},onRemove:function(a){a.removeLayer(this.cluster),this._destroyFeatureGrid(a)},addTo:function(a){return a.addLayer(this),this},getWhere:function(){return this.options.where},setWhere:function(a){return this.options.where=a,this.refresh(),this},getFields:function(){return this.options.fields},setFields:function(a){return this.options.fields=a,this.refresh(),this},refresh:function(){this.cluster.clearLayers(),this._loaded=[],this._previousCells=[],this._requestFeatures(this._map.getBounds())},_setObjectIdField:function(a){if(a.objectIdFieldName)this._objectIdField=a.objectIdFieldName;else for(var b=0;b<=a.fields.length-1;b++)if("esriFieldTypeOID"===a.fields[b].type){this._objectIdField=a.fields[b].name;break}},_render:function(a){if(a.features&&a.features.length&&!a.error){this._objectIdField||this._setObjectIdField(a);for(var b=[],c=a.features.length-1;c>=0;c--){var d=a.features[c],e=d.attributes[this._objectIdField];if(L.esri.Util.indexOf(this._loaded,e)<0){var f=L.esri.Util.arcgisToGeojson(d);f.id=e;var g=this.options.createMarker(f,[f.geometry.coordinates[1],f.geometry.coordinates[0]]);this.options.onEachMarker&&this.options.onEachMarker(f,g),b.push(g),this._loaded.push(e)}}this.cluster.addLayers(b)}}}),L.esri.ClusteredFeatureLayer.include(L.Mixin.Events),L.esri.ClusteredFeatureLayer.include(L.esri.Mixins.metadata),L.esri.clusteredFeatureLayer=function(a,b){return new L.esri.ClusteredFeatureLayer(a,b)}}(L);