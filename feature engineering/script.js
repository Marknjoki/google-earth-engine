// Define area of interest (AOI) as a rectangle
var aoi = ee.Geometry.Rectangle([36.6642902522466727, -1.4447602663776327, 37.1045268273754303, -1.1605375805654641]); // [xmin, ymin, xmax, ymax]

// Load Landsat 8 surface reflectance imagery
var landsatCollection = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
    .filterBounds(aoi)
    .filterDate("2023-01-01", "2024-03-24");

// Function to calculate NDVI
var calculateNDVI = function (image) {
    var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']); // NIR (Band 5) - Red (Band 4)
    return ndvi;
};

// Map NDVI calculation function over the Landsat imagery collection
var ndviCollection = landsatCollection.map(calculateNDVI);

// Export NDVI image to Google Drive
Export.image.toDrive({
    image: ndviCollection.toBands(), // Convert image collection to multiband image
    description: 'NDVI_Image',
    folder: 'GEE_Export',
    scale: 30, // Spatial resolution in meters
    region: aoi,
    maxPixels: 1e9 // Max number of pixels
});
// Define area of interest (AOI) as a rectangle
var aoi = ee.Geometry.Rectangle([36.6642902522466727, -1.4447602663776327, 37.1045268273754303, -1.1605375805654641]); // [xmin, ymin, xmax, ymax]

// Load Landsat 8 surface reflectance imagery
var landsatCollection = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
    .filterBounds(aoi)
    .filterDate("2023-01-01", "2024-03-24");

// Function to calculate NDVI
var calculateNDVI = function (image) {
    var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']); // NIR (Band 5) - Red (Band 4)
    return ndvi;
};

// Map NDVI calculation function over the Landsat imagery collection
var ndviCollection = landsatCollection.map(calculateNDVI);

// Export NDVI image to Google Drive
Export.image.toDrive({
    image: ndviCollection.toBands(), // Convert image collection to multiband image
    description: 'NDVI_Image',
    folder: 'GEE_Export',
    scale: 30, // Spatial resolution in meters
    region: aoi,
    maxPixels: 1e9 // Max number of pixels
});
