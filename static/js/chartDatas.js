aapl = [
    {
        date: '2007-04-24',
        close: 95.35
    },
    {
        date: '2007-04-24',
        close: 95.35
    },
    {
        date: '2007-04-24',
        close: 95.35
    },
    {
        date: '2007-04-24',
        close: 95.35
    },

]

chart = LineChart(aapl, {
    x: d => d.date,
    y: d => d.close,
    yLabel: "↑ Daily close ($)",
    width: 1500,
    height: 500,
    color: "steelblue"
})