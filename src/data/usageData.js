import networkData from "./networksData";

let high = 0;
let medium = 0;
let low = 0;

networkData.networks.forEach(element => {
    if (element.properties.USAGE === 'high') {
        high++;
    }
    if (element.properties.USAGE === 'medium') {
        medium++;
    }
    if (element.properties.USAGE === 'low') {
        low++;
    }
});

const usageData = {
    high: high,
    medium: medium,
    low: low,
    total : (high + medium + low)
}

export default usageData;