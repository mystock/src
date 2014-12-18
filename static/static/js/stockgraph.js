var startdate = '2000-01-01';
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


var chartData;

$.ajax({
    url: '/data',
    type: 'get', //this is the default though, you don't actually need to always mention it
    dataType: 'json',
    success: function(data) {
    
        alert(JSON.stringify(data));
        //chartData = JSON.stringify(data);
        drawGraph(data);
    },
    failure: function(data) { 
        alert('Got an error dude');
    }
});

function drawGraph(data) {


    chartData=data;
    
    var chart = new AmCharts.AmStockChart();
    chart.pathToImages = "/static/amstockchart_3.11.3.free/amcharts/images/";
    chart.dataProvider = chartData;
    chart.categoryField = "date"
    chart.fontSize = 9;
    chart.startDuration = 1;
    chart.plotAreaFillAlphas = 0.2;
     
    //here you can add code for other options
     
    chart.write("chartdiv");
 
    
    chartData=data;
    
    var chart = new AmCharts.AmStockChart();
    chart.pathToImages = "/static/amstockchart_3.11.3.free/amcharts/images/";
    
    var dataSet = new AmCharts.DataSet();
    dataSet.dataProvider = chartData;
    dataSet.fieldMappings = [{fromField:"val", toField:"value"}];   
    dataSet.categoryField = "date";          
    chart.dataSets = [dataSet];

    var stockPanel = new AmCharts.StockPanel();
    chart.panels = [stockPanel];

    var legend = new AmCharts.StockLegend();
    stockPanel.stockLegend = legend;                

    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.startDuration = 1;
    chart.panelsSettings = panelsSettings;   

    var graph = new AmCharts.StockGraph();
    graph.valueField = "value";
    graph.type = "line";
    graph.title = "MyGraph";
    graph.fillAlphas = 0;
    stockPanel.addStockGraph(graph);

    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
    categoryAxesSettings.dashLength = 5;
    chart.categoryAxesSettings = categoryAxesSettings;

    var valueAxesSettings = new AmCharts.ValueAxesSettings();
    valueAxesSettings .dashLength = 5;
    chart.valueAxesSettings  = valueAxesSettings;

    var chartScrollbarSettings = new AmCharts.ChartScrollbarSettings();
    chartScrollbarSettings.graph = graph;
    chartScrollbarSettings.graphType = "line";
    chart.chartScrollbarSettings = chartScrollbarSettings;

    var chartCursorSettings = new AmCharts.ChartCursorSettings();
    chartCursorSettings.valueBalloonsEnabled = true;
    chart.chartCursorSettings = chartCursorSettings;

    var periodSelector = new AmCharts.PeriodSelector();
    periodSelector.periods = [{period:"DD", count:1, label:"1 day"},
                              {period:"DD", selected:true, count:5, label:"5 days"},
                              {period:"MM", count:1, label:"1 month"},
                              {period:"YYYY", count:1, label:"1 year"},
                              {period:"YTD", label:"YTD"},
                              {period:"MAX", label:"MAX"}];                
    chart.periodSelector = periodSelector;
    
    chart.write("chartdiv");
}

        