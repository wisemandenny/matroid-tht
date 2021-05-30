const HeaderText = 'Matroid Frontend Challenge'

const toTitleCase = (string) =>
string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const BoundingBoxColor = 'yellow'
const BoundingBoxWidth = 3

export { HeaderText, MONTHS, BoundingBoxColor, BoundingBoxWidth, toTitleCase }