const models=require("../models")
async function average(req,res){
    const progress=await models.Progress.findAll();
    var sum=[0,0,0,0,0];
    var c=[0,0,0,0,0];
    var avg=[0,0,0,0,0];
    for(var i=0;i<progress.length;i++){
        if(progress[i].r1e!=null){
            c[0]++;
            sum[0]+=new Date(progress[i].r1e).getTime()- new Date(progress[i].r1s).getTime();
        }
        if(progress[i].r2e!=null){
            c[1]++;
            sum[1]+=new Date(progress[i].r2e).getTime()- new Date(progress[i].r2s).getTime();
        }
        if(progress[i].r3e!=null){
            c[2]++;
            sum[2]+=new Date(progress[i].r3e).getTime()- new Date(progress[i].r3s).getTime();
        }
        if(progress[i].r4e!=null){
            c[3]++;
            sum[3]+=new Date(progress[i].r4e).getTime()- new Date(progress[i].r4s).getTime();
        }
        if(progress[i].r5e!=null){
            c[4]++;
            sum[4]+=new Date(progress[i].r5e).getTime()- new Date(progress[i].r5s).getTime();
        }
    }

    for(var i=0;i<5;i++){
        if(c[i]){
            avg[i]=(sum[i])/(c[i]);
            // minutes
            avg[i]/=60000;
        }
    }

    
    

    res.status(200).json({
        avg,
        success:true
    });



}

async function count(req,res){
    const progress=await models.Progress.findAll();
    var c=[0,0,0,0,0];
    for(var i=0;i<progress.length;i++){
        if(progress[i].r1e!=null){
            c[0]++;
        }
        if(progress[i].r2e!=null){
            c[1]++;
        }
        if(progress[i].r3e!=null){
            c[2]++;
        }
        if(progress[i].r4e!=null){
            c[3]++;
        }
        if(progress[i].r5e!=null){
            c[4]++;
        }
    }
    res.status(200).json({
        c,
        progress,
        success:true
    });

}

function timeToString(time) {
    var diffDays = Math.floor(time / 86400000); // days
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);


  let formattedDD = diffDays.toString().padStart(2, "0");
  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");

  return `${formattedDD} days :${formattedHH} hrs: ${formattedMM} minutes`
}

async function leaderboard(req,res){
    const progress=await models.Progress.findAll();
    var a=[];
    progress.forEach(element => {
        if(element.username==="admin@gmail.com" || element.username==="admin"){
            return;
        }
        a.push({})
        var l=a.length-1;
        a[l].username=element.username;
        if(element.r5e!=null){
            a[l].rounds=5;
            var t=new Date(element.r5e).getTime()-new Date(element.r1s).getTime();
            a[l].time=timeToString(t);
            a[l].t=t;
        }
        else if(element.r4e!=null){
            a[l].rounds=4;
            var t=new Date(element.r4e).getTime()-new Date(element.r1s).getTime();
            a[l].time=timeToString(t);
            a[l].t=t;
        }
        else if(element.r3e!=null){
            a[l].rounds=3;
            var t=new Date(element.r3e).getTime()-new Date(element.r1s).getTime();
            a[l].time=timeToString(t);
            a[l].t=t;
        }
        else if(element.r2e!=null){
            a[l].rounds=2;
            var t=new Date(element.r2e).getTime()-new Date(element.r1s).getTime();
            a[l].time=timeToString(t);
            a[l].t=t;
        }
        else if(element.r1e!=null){
            a[l].rounds=1;
            var t=new Date(element.r1e).getTime()-new Date(element.r1s).getTime();
            a[l].time=timeToString(t);
            a[l].t=t;
        }else{
            a[l].rounds=0;
            a[l].t=0;
            a[l].time="-";
        }
    });
    const sorted = a.sort((a,b) => {

        const [a1, a2] =[a.rounds,a.t]
        const [b1, b2] = [b.rounds,b.t]
    
        return b1-a1 || a2 - b2;
    
    });
    res.status(200).json({
        leaderboard:sorted,
        success:true
    })




}


module.exports={
    average:average,
    count:count,
    leaderboard:leaderboard
}