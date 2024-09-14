
import connectDB from '@/middlewares/db';
import Entry from '@/models/Entry';


const dataHandler = async (req, res) => {

  if (req.body.API_KEY !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ type: "error", message: 'Unauthorized' });
  }
  
    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth() + 1;
    const currentDay = now.getUTCDate();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();
  try {
    
    const entries = await Entry.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$expiryDate" }, currentYear] },
              { $eq: [{ $month: "$expiryDate" }, currentMonth] },
              { $eq: [{ $dayOfMonth: "$expiryDate" }, currentDay] },
              { $eq: [{ $hour: "$expiryDate" }, currentHour] },
              { $eq: [{ $minute: "$expiryDate" }, currentMinute] }
            ]
          }
        }
      }
    ])

    return res.status(200).json({ type: "success", message: 'Entries Found', entries: entries });
   


  } catch (error) {
    console.log(error)
    return res.status(401).json({ type: "error", message: 'Something Went wrong' });
  }
};


export default connectDB(dataHandler);