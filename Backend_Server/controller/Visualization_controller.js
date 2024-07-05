import Data from "../models/VisualizationDashboard_models.js"

export const Visualizations = async(req,res)=>{
console.log(req.body)
const { endYear, topic, sector, region, pest, source, swot, country, city } = req.query;
    const query = {};
    if (endYear) query.end_year = endYear;
    if (topic) query.topic = topic;
    if (sector) query.sector = sector;
    if (region) query.region = region;
    if (pest) query.pestle = pest;
    if (source) query.source = source;
    if (swot) query.swot = swot;
    if (country) query.country = country;
    if (city) query.city = city;


  const data = await Data.find(query);
//   const data = await Data.find({ data: { $eq: [] } });
  console.log(data)
  const user =data.map((item)=>{
    return item._id
    
  })
  res.json(data);
  console.log(user)
}