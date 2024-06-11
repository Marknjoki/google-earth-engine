// Define the region of interest (Nairobi)
var roi = ee.Geometry.Rectangle([36.6642902522466727, -1.4447602663776327, 37.1045268273754303, -1.1605375805654641]);

// Define the time period (3 days)
var startDate = '2024-02-1';
var endDate = '2024-03-24';

// Load Sentinel-5P NO2 dataset
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
    .filterBounds(roi)
    .filterDate(startDate, endDate);

// Select the NO2 column (tropospheric NO2)
var no2 = collection.select('tropospheric_NO2_column_number_density');

// Apply a median reducer to reduce noise
var no2Median = no2.median();

// Visualize the NO2 data
var visParams = {
    min: 0,
    max: 0.0002,
    palette: 'black, blue, purple, cyan, green, yellow, red'
};

// Add NO2 layer to the map
Map.addLayer(no2Median, visParams, 'NO2');

// Center the map on Nairobi
Map.centerObject(roi, 10);

// Display the map
Map
Export.image.toDrive({
    image: no2Median,
    description: 'NO2_Nairobi_3days',
    scale: 1000, // adjust scale as needed
    region: roi,
    crs: 'EPSG:4326', // set CRS to WGS84
    maxPixels: 1e13
})
