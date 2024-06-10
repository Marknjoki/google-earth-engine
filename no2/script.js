var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
    .select('NO2_column_number_density')
    .filterDate('2024-03-18', '2024-03-20');

var band_viz = {
    min: 0,
    max: 0.0002,
    palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(collection.mean(), band_viz, 'S5P N02');

var nairobi = ee.Geometry.Point([36.8219, -1.2921]); // Nairobi coordinates

// Iterate through the images in the collection
collection.evaluate(function (images) {
    for (var i = 0; i < images.length; i++) {
        var image = ee.Image(images[i]);
        var image_date = ee.Date(image.get('system:time_start'));
        var image_nairobi = image.clip(nairobi);
        var export_name = 'NO2_Nairobi_' + image_date.format('YYYY-MM-dd').getInfo(); // Set export name

        // Export the image to Google Drive
        Export.image.toDrive({
            image: image_nairobi,
            description: "NO2_Nairobi",
            folder: "Brian",

            scale: 10,
            region: nairobi,
            maxPixels: 1e13
        });
    }
});