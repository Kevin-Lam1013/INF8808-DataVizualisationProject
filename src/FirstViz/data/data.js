import liga from '../data/laLiga_2021-2022.csv'
import league from '../data/premierLeague_2021-2022.csv'
import ligue from '../data/ligue1_2021-2022.csv'
import psg from '../data/psg_2021-2022.csv'
import real from '../data/real_2021-2022.csv'
import liv from '../data/liv_2021-2022.csv'




const dataCSV = {
    mbappe : {
        ligue : ligue,
        team : psg
    },
    benzema : {
        ligue : liga,
        team : real
    },
    mane : {
        ligue : league,
        team : liv
    },
    "Paris S-G" : {
        competitions : [
            {name : "Ligue 1", place : 'Winners'},
            {name : "Coupe de France", place : 'Round of 16'},
            {name : "Trophée des champions", place : "2nd"},
            {name : "Champions League", place : "Round of 16"}
        ]
    },
    "Real Madrid" : {
        competitions : [
            {name : "La Liga", place : 'Winners'},
            {name : "Copa del Rey", place : 'Quarter-finals'},
            {name : "Supercopa de España", place : "Winners"},
            {name : "Champions League", place : "Winners"}
        ]
    },
    "Liverpool" : {
        competitions : [
            {name : "Premier League", place : '2nd'},
            {name : "FA Cup", place : 'Winners'},
            {name : "EFL Cup", place : "Winners"},
            {name : "Champions League", place : "2nd"}
        ]
    }
}

export default dataCSV;