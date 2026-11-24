/* RIDE V26 - Smart Travel Planner */
(function(){
  'use strict';

  const V26_STYLE = `
  .trip-v26-section{margin:14px 0;padding:14px;border:1px solid #3b5537;border-radius:15px;background:linear-gradient(145deg,#17291c,#101a14)}
  .trip-v26-section-head,.trip-v26-panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:11px}
  .trip-v26-section-head strong,.trip-v26-panel-head strong{display:block;font-size:12px;letter-spacing:-.2px}
  .trip-v26-section-head small,.trip-v26-panel-head small{display:block;margin-top:4px;color:#9eaea1;font-size:8px;line-height:1.5}
  .trip-v26-kicker{color:var(--lime);font-size:7px;font-weight:950;letter-spacing:1.3px}
  .trip-v26-estimate{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:10px;padding:10px;border:1px solid #344b37;border-radius:11px;background:#0b160f}
  .trip-v26-estimate>div{min-width:0}.trip-v26-estimate strong{display:block;color:#eff6e9;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.trip-v26-estimate small{display:block;margin-top:4px;color:#91a293;font-size:7px;line-height:1.35}
  .trip-v26-hint{display:block;margin-top:8px;color:#839486;font-size:7px;line-height:1.5}
  .trip-v26-budget{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin:12px 0;padding:12px;border:1px solid #344a38;border-radius:14px;background:#101c14}
  .trip-v26-budget>div{min-width:0;padding:8px;border-radius:9px;background:#17271b}
  .trip-v26-budget strong{display:block;color:#eaf3e5;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .trip-v26-budget small{display:block;margin-top:4px;color:#92a394;font-size:7px}
  .trip-v26-budget .total{background:#243720;border:1px solid #49643a}
  .trip-v26-budget .total strong{color:var(--lime);font-size:13px}
  .trip-v26-day-panel{margin:0 0 11px 40px;padding:12px;border:1px solid #344a38;border-radius:14px;background:#101b14}
  .trip-v26-day-panel:last-child{margin-bottom:0}
  .trip-v26-day-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:10px 0}
  .trip-v26-day-metrics>div{min-width:0;padding:8px;border:1px solid #2d4233;border-radius:9px;background:#0b160f}
  .trip-v26-day-metrics strong{display:block;color:#eff6e9;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .trip-v26-day-metrics small{display:block;margin-top:4px;color:#91a293;font-size:7px;line-height:1.35}
  .trip-v26-day-details{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
  .trip-v26-detail{min-width:0;padding:9px;border:1px solid #2d4233;border-radius:10px;background:#0c1710}
  .trip-v26-detail strong{display:block;font-size:8px;color:#dce8d9}
  .trip-v26-detail p{min-height:28px;margin:5px 0 8px;color:#9eaea1;font-size:7px;line-height:1.45;overflow-wrap:anywhere}
  .trip-v26-detail button{width:100%;min-height:30px;padding:0 7px;border:1px solid #40583a;border-radius:8px;background:#1b2d1c;color:var(--lime);font-size:7px;font-weight:900}
  .trip-v26-results{display:grid;gap:6px;margin-top:8px}
  .trip-v26-result{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px;border:1px solid #2d4233;border-radius:10px;background:#0b160f}
  .trip-v26-result-icon{width:27px;height:27px;display:grid;place-items:center;border-radius:8px;background:#253a25;font-size:13px}
  .trip-v26-result-copy{min-width:0}.trip-v26-result-copy strong{display:block;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.trip-v26-result-copy small{display:block;margin-top:3px;color:#91a293;font-size:7px;line-height:1.4}
  .trip-v26-result-actions{display:flex;gap:5px;align-items:center}.trip-v26-result-actions a,.trip-v26-result-actions button{display:inline-flex;align-items:center;justify-content:center;min-height:27px;padding:0 8px;border:1px solid #40583a;border-radius:8px;background:#1b2d1c;color:var(--lime);font-size:7px;font-weight:900;text-decoration:none;white-space:nowrap}.trip-v26-result-actions button{background:var(--lime);border-color:var(--lime);color:#14200e}
  .trip-v26-loading,.trip-v26-empty{padding:10px;border:1px dashed #3b503c;border-radius:10px;color:#9eaea1;font-size:8px;line-height:1.5}
  .trip-v26-disclaimer{display:block;margin-top:9px;color:#839486;font-size:7px;line-height:1.5}
  .trip-v26-card-breakdown{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
  .trip-v26-card-breakdown span{padding:5px 7px;border:1px solid #2d4233;border-radius:7px;background:#0c1710;color:#9eaea1;font-size:7px}
  .trip-v26-card-breakdown b{color:#e7f1e1;font-weight:900}
  @media(max-width:820px){.trip-v26-budget{grid-template-columns:repeat(3,minmax(0,1fr))}.trip-v26-day-panel{margin-left:0}.trip-v26-day-details{grid-template-columns:1fr}}
  @media(max-width:560px){.trip-v26-section{padding:11px}.trip-v26-estimate{grid-template-columns:repeat(2,minmax(0,1fr))}.trip-v26-budget{grid-template-columns:repeat(2,minmax(0,1fr));padding:9px}.trip-v26-budget .total{grid-column:1/-1}.trip-v26-day-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.trip-v26-day-panel{padding:9px}.trip-v26-result{grid-template-columns:25px minmax(0,1fr)}.trip-v26-result-actions{grid-column:2;justify-content:flex-start}.trip-v26-result-icon{width:24px;height:24px}}
  `;

  function addStyles(){
    if(document.getElementById('ride-v26-style'))return;
    const style=document.createElement('style');style.id='ride-v26-style';style.textContent=V26_STYLE;document.head.appendChild(style);
  }
  function n(value,fallback=0){const x=Number(value);return Number.isFinite(x)?x:fallback}
  function clamp(value,min,max){return Math.min(max,Math.max(min,n(value,min)))}
  function eur(value){return n(value).toLocaleString('it-IT',{style:'currency',currency:'EUR',maximumFractionDigits:0})}
  function decimal(value,digits=1){return n(value).toLocaleString('it-IT',{minimumFractionDigits:digits,maximumFractionDigits:digits})}
  function safeProfile(){return state.profile||{}}
  function consumptionDefaults(){
    let measured=0;
    try{measured=n(fuelMetrics()?.averageConsumption)}catch(error){}
    if(measured>.1&&measured<30)return{value:measured,source:'registro carburante'};
    const saved=n(safeProfile().bikeConsumption);
    if(saved>.1&&saved<30)return{value:saved,source:'scheda garage'};
    return{value:5.5,source:'stima iniziale'};
  }
  function tankDefaults(){
    const saved=n(safeProfile().bikeTankCapacity);
    return saved>=1&&saved<=50?saved:18;
  }
  function fuelSummary(day,route,override){
    const plan={...(day?.fuelPlan||{}),...(override||{})};
    const consumptionInfo=consumptionDefaults();
    const consumption=clamp(plan.consumption||consumptionInfo.value,.1,30);
    const tankCapacity=clamp(plan.tankCapacity||tankDefaults(),1,50);
    const startFuelPercent=clamp(plan.startFuelPercent===undefined?100:plan.startFuelPercent,0,100);
    const reservePercent=clamp(plan.reservePercent===undefined?15:plan.reservePercent,5,35);
    const fuelPricePerLiter=clamp(plan.fuelPricePerLiter||1.85,.5,5);
    const distance=n(route?.distance);
    const liters=distance*consumption/100;
    const fuelCost=liters*fuelPricePerLiter;
    const theoreticalRange=tankCapacity*(startFuelPercent/100)/consumption*100;
    const reserveRange=tankCapacity*(reservePercent/100)/consumption*100;
    const safeRange=Math.max(0,theoreticalRange-reserveRange);
    const recommendedRange=safeRange*.82;
    const stopsRequired=recommendedRange>0&&distance>recommendedRange?Math.max(0,Math.ceil(distance/recommendedRange)-1):0;
    return{distance,consumption,consumptionSource:plan.consumptionSource||consumptionInfo.source,tankCapacity,startFuelPercent,reservePercent,fuelPricePerLiter,liters,fuelCost,theoreticalRange,safeRange,recommendedRange,stopsRequired};
  }
  function budgetForDay(day,route){
    const fuel=fuelSummary(day,route);
    const existing=day?.budgetBreakdown||{};
    return{
      fuel:n(existing.fuel,fuel.fuelCost),
      meals:n(existing.meals,day?.mealCost||0),
      lodging:n(existing.lodging,day?.overnightCost||0),
