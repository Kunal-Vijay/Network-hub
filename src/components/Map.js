import React, { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import networkData from "../data/networksData";


function color(usage) {
    // let usage = networkData.networks.properties.USAGE;
    if (usage === "high") {
        return "blue";
    }
    if (usage === "medium") {
        return "blueviolet";
    }
    if (usage === "low") {
        return "aqua";
    }
}

export default function NetworkMap() {
    const [viewState, setViewState] = useState({
        latitude: 51.984880,
        longitude: -1.889189,
        zoom: 1.2,
    });
    const [selectedNetwork, setSelectedNetwork] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    return (
        <div style={{ margin: "10px" }}>
            <Map
                initialViewState={{
                    latitude: 51.984880,
                    longitude: -1.889189,
                    zoom: 1.2,
                    // latitude: 45.4111,
                    // longitude: -75.6903,
                    // zoom: 10,
                }}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ width: "100vw", height: "100vh" }}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
                {networkData.networks.map((network) => (
                    <Marker
                        key={network.properties.NETWORK_ID}
                        latitude={network.geometry.coordinates[0]}
                        longitude={network.geometry.coordinates[1]}
                    >
                        <button style={{ background: `${color(network.properties.USAGE)}`, opacity: "0.5", borderRadius: "50%", border: `1px solid blue`, height: `${(viewState.zoom) * (network.properties.RANGE)}vw`, width: `${(viewState.zoom) * (network.properties.RANGE)}vw` }} onClick={(e) => {
                            e.preventDefault();
                            setSelectedNetwork(network);
                            setShowPopUp(true);
                        }}>
                            <img
                                src="/tower.svg"
                                alt=""
                                style={{ width: "40%", height: "40%" }}
                            />
                        </button>
                    </Marker>
                ))}

                {(showPopUp && <Popup className='popup' longitude={selectedNetwork.geometry.coordinates[1]} latitude={selectedNetwork.geometry.coordinates[0]}
                    anchor="bottom"
                    closeOnClick={false}
                    onClose={() => {
                        setSelectedNetwork(null);
                        setShowPopUp(false);
                    }}
                >
                    <div>
                        <h3>{selectedNetwork.properties.NETWORK_PROVIDER}</h3>
                        <p><b>Network id :</b>{selectedNetwork.properties.NETWORK_ID}</p>
                        <p><b>Region :</b>{selectedNetwork.properties.REGION}</p>
                        <p><b>Users :</b>{selectedNetwork.properties.USERS}</p>
                    </div>
                </Popup>)}
            </Map> 
        </div>
    )
}

