import { date } from "yup";

function operator(phone){
    var mtn_tab = ["650","651","652","653","654","670","671","672","673","674","675","676","677","678","679","680"];
    var orange_tab = ["655","656","657","658","659","690","691","692","693","694","695","696","697","698","699"];
    
    var tel = String(phone).replace('+237','');
    // var tel = String(phone).startsWith('237').replace('237','');
  
    if (mtn_tab.includes(tel.slice(0,3))){
      return "mtn-cm";
    }
    else if(orange_tab.includes(tel.slice(0,3))){
      return "orange-cm";
    }
    else{
      return "mtn-cm";
    }
    // return tel.slice(0,3);
    
};
const TimesGroups = (groups,group_code)=>{
    const filterRank = groups.filter((elt)=> elt?.attributes?.group_code == group_code && elt?.attributes?.rank == 1);
    const dateCompute = filterRank.length > 0 ? filterRank[0].attributes.group_created_at : new date();
    const countDown = new Date(dateCompute).getTime();
    const now = new Date().getTime();
    const distanceBase = now - countDown;
    const days = Math.floor(distanceBase /(1000 * 60 * 60 * 24));
    const hours = Math.floor((distanceBase % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distanceBase % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceBase % (1000 * 60)) / (1000));
    const hoursDisplay = days <= 0 ? (hours <=0 ? Math.floor(24 -(minutes/60)) : 24-hours) :0
    const minutesDisplay = days <= 0 ? (minutes <=0 ? Math.floor(60 -(seconds/60)) : 60-minutes) :0;
    const secondDisplay = days <= 0 ? (60-seconds) :0;
    return {
        hoursDisplay,
        minutes:minutesDisplay,
        seconds:secondDisplay,
        days
    }
};
export {operator,TimesGroups}