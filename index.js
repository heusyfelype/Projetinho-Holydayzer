
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];



app.get("/holidays", (req, res) => {
    res.send(holidays);
})

app.get("/holidays/:month", (req, res) => {
    const month = req.params.month

    let holidaysOnThisMonth = []
    for(let i=0; i<holidays.length; i++){
        let dayHoliday = holidays[i].date.split("/")
        if(dayHoliday[0] === month){
            holidaysOnThisMonth.push(holidays[i])
        }
    }

    if(holidaysOnThisMonth.length > 0){
        res.send(holidaysOnThisMonth);
    } else{
        let allMonths = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
        res.send("Não há feriados no mês de " + allMonths[month-1]);
    }
})


app.get("/is-today-holiday", (req, res) => {
    const today = new Date();
    const todayString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
    let isHoliday = false;
    let theHoliday = ""

    for (let eachHoliday of holidays) {
        if (eachHoliday.date === todayString) {
            isHoliday = true;
            theHoliday = eachHoliday.name;
        }
    }
    if (isHoliday) {
        res.send("Sim, hoje é " + theHoliday);
    } else {
        res.send("Não, hoje não é feriado");
    }
})

app.listen(5000)