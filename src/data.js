export const API_KEY = 'AIzaSyDT6JlrapImJzpH8OodTNj_S0MgQ1CNwfA';



export const value_counter = (value) => {
    if (value >= 1000000){
        return Math.floor(value/1000000) + "M";
    }
    else if (value>=1000){
        return Math.floor(value/1000) + "k"

    }else {
        return value;
    }
}