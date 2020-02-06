//
// export const DEFAULT_DATA = {
//   "location": {
//     "coordinates":[36,-115],
//     "city":"Los Angeles","cc":"us"
//   },
//   "news": {
//     "world": [
//       "Israel’s Netanyahu Indicted on Charges of Fraud, Bribery and Breach of Trust",
//       "At Odds With Labour, Britain’s Jews Are Feeling Politically Homeless",
//       "Iran Declares Protests Are Over, but the Evidence Suggests Otherwise",
//       "Dozens of Babies Died Because of U.K. Hospital Failings, Report Finds",
//       "What’s Next for Netanyahu, and Israel?",
//       "Extinction Rebellion Co-Founder Apologizes for Holocaust Remarks",
//       "Afghanistan’s Curse: A Bomb From 2 Wars Ago Crushes a Family Today",
//       "Prince Andrew’s Friendship With Epstein Joins a List of Royal Scandals",
//       "Rodrigo Duterte Calls for Ban on Public Vaping in the Philippines",
//       "Corbyn Presents a Labour Manifesto That Offers ‘Radical Answers’ for the U.K."
//     ],
//     "business": [
//       "Plane departing LAX suffers engine failure, spews flames - Fox News",
//       "Everything Jim Cramer said about the stock market on 'Mad Money,' including Schwab-TD Ameritrade talks, weed stocks, United Airlines and AMD CEOs - CNBC",
//       "Winter storm expected to bring snow to Idaho, could hamper Thanksgiving travel - KTVB.com",
//       "Personal loans are 'growing like a weed,' a potential warning sign for the US economy - msnNOW","The US Just Approved Four More LNG Projects - OilPrice.com",
//       "Packaged Salad Recall Due to E. Coli Concerns - ConsumerReports.org",
//       "Bombshell GM lawsuit has bribes, backdoor schemes - Yahoo News",
//       "While 2400 WeWork Employees Are Laid Off Nationwide, WeWork Hands Out Donuts - TheStranger.com",
//       "NYC is flooding subway entrances to prepare for climate change - Quartz",
//       "Microsoft granted license to export 'mass-market' software to Huawei - Reuters"
//     ],
//     "national": [
//       "Two days after launch, Google Stadia founders finally have their access codes - The Verge",
//       "The Democratic Candidates Are Moving to the Center - Slate",
//       "Yang says impeachment may not help the Democrats in 2020 - CNN",
//       "Israeli Prime Minister Benjamin Netanyahu charged with fraud and breach of trust - CBS News",
//       "Harrison Ford eyes first major TV role with 'The Staircase': report - Fox News",
//       "New report disputes the Patriots have interest in Antonio Brown - NBCSports.com",
//       "Everything Jim Cramer said about the stock market on 'Mad Money,' including Schwab-TD Ameritrade talks, weed stocks, United Airlines and AMD CEOs - CNBC",
//       "Chris Brown Welcomes Son With Ammika Harris - Yahoo Celebrity",
//       "'I know what I heard': Cleveland Browns defensive end Myles Garrett issues statement after indefinite suspension upheld by NFL - WKYC.com",
//       "Scooter Braun breaks six-month silence on Taylor Swift dispute -CNN"
//     ]
//   },
//   "finance": {
//     "crypto": [
//       {"ticker":"BTC","name":"Bitcoin","price":7647.25,"changes":-4.58,"marketCapitalization":138113000000},
//       {"ticker":"ETH","name":"Ethereum","price":161.622,"changes":-7.93,"marketCapitalization":17559100000},
//       {"ticker":"XRP","name":"Ripple","price":0.243974,"changes":-2.9,"marketCapitalization":10564100000},
//       {"ticker":"BCH","name":"Bitcoin Cash","price":226.848,"changes":-6.85,"marketCapitalization":4111780000},
//       {"ticker":"EOS","name":"EOS","price":2.82142,"changes":-8.87,"marketCapitalization":2655420000},
//       {"ticker":"LTC","name":"Litecoin","price":50.8658,"changes":-7.87,"marketCapitalization":3241710000},
//       {"ticker":"ADA","name":"Cardano","price":0.0384679,"changes":-6.29,"marketCapitalization":997361000},
//       {"ticker":"XLM","name":"Stellar","price":0.0618675,"changes":-4.99,"marketCapitalization":1240740000},
//       {"ticker":"MIOTA","name":"IOTA","price":0.227719,"changes":-5.71,"marketCapitalization":632952000},
//       {"ticker":"TRX","name":"TRON","price":0.0154217,"changes":-7.04,"marketCapitalization":1028350000}
//     ],
//     "indexes": [
//       {"ticker":".DJI","changes":-53.9902,"price":27766.3,"name":"Dow Jones"},
//       {"ticker":".IXIC","changes":-52,"price":7963,"name":"Nasdaq"},
//       {"ticker":".INX","changes":-4.95,"price":3103.54,"name":"S&P 500"},
//       {"ticker":"%5EFCHI","changes":20.6602,"price":5881.21,"name":"CAC 40"},
//       {"ticker":"%5ERUI","changes":-3.5271,"price":1715.5,"name":"Russell 1000 Index"},
//       {"ticker":"%5ERUT","changes":-10.1333,"price":1583.96,"name":"Russell 2000 Index"},
//       {"ticker":"%5EPSE","changes":-4.6433,"price":3623.25,"name":"NYSE Arca Technology 100 Index"},
//       {"ticker":"%5EDJT","changes":3.5801,"price":10709.3,"name":"Dow Jones Transportation Average"},
//       {"ticker":"%5EIXCO","changes":-5.2144,"price":5522.36,"name":"NASDAQ Computer Index"},
//       {"ticker":"%5EMID","changes":-5.1,"price":1992.01,"name":"S&P 400 Mid Cap Index"}
//     ]
//   },
//   "weather": {
//     "type": "Clouds",
//     "description": "broken clouds",
//     "icon": "04n",
//     "temp": 45.07,
//     "high": 48.2,
//     "low": 42.8
//   },
//   "calendar": {
//     "date": 21,
//     "day": "Thursday",
//     "month": "November"
//   }
// };

export const DEFAULT_DATA = {
  calendar: {
    "date":27,"day":"Wednesday","month":"November", monthStart: 5, monthEnd: 30, "holidays":[{"name":"Veterans Day","day":11},{"name":"Thanksgiving Day","day":28}]
  },
  finance: {
    crypto: [
      {name: "Bitcoin", price: "$7502.35", changes: "4.31", ticker: "BTC"},
      {name: "Ethereum", price: "$152.71", changes: "3.05", ticker: "ETH"},
      {name: "Ripple", price: "$0.23", changes: "2.35", ticker: "XRP"},
      {name: "Bitcoin Cash", price: "$220.61", changes: "3.81", ticker: "BCH"},
      {name: "EOS", price: "$2.69", changes: "2.95", ticker: "EOS"},
      {name: "Litecoin", price: "$47.82", changes: "2.14", ticker: "LTC"},
      {name: "Cardano", price: "$0.04", changes: "4.88", ticker: "ADA"},
      {name: "Stellar", price: "$0.06", changes: "0.28", ticker: "XLM"},
      {name: "IOTA", price: "$0.22", changes: "1.95", ticker: "MIOTA"},
      {name: "TRON", price: "$0.02", changes: "5.27", ticker: "TRX"}
    ],
    indexes: [
      {name: "Dow Jones", price: "$28164.00", changes: "7.53", ticker: ".DJI"},
      {name: "Nasdaq", price: "$7963.00", changes: "-52.00", ticker: ".IXIC"},
      {name: "S&P 500", price: "$3153.63", changes: "8.14", ticker: ".INX"},
      {name: "CAC 40", price: "$5926.84", changes: "-16.61", ticker: "%5EFCHI"},
      {name: "Russell 1000 Index", price: "$1744.38", changes: "5.54", ticker: "%5ERUI"},
      {name: "Russell 2000 Index", price: "$1634.10", changes: "7.30", ticker: "%5ERUT"},
      {name: "NYSE Arca Technology 100 Index", price: "$3676.26", changes: "-7.99", ticker: "%5EPSE"},
      {name: "Dow Jones Transportation Average", price: "$10949.50", changes: "-15.12", ticker: "%5EDJT"},
      {name: "NASDAQ Computer Index", price: "$5614.49", changes: "0.64", ticker: "%5EIXCO"},
      {name: "S&P 400 Mid Cap Index", price: "$2020.27", changes: "-2.23", ticker: "%5EMID"}
    ]
  },
  location: {"cc":"us","coordinates":[34.052235,-118.243683],"city":"Los Angeles"},
  news: {
    business: ["The List Of Shame: Here Are All The Retail Outlets Open On Thanksgiving - The Daily Wire", "Steve Wynn to pay half of $41 million settlement w… pension fund after sex allegations - MarketWatch", "Walmart's Black Friday 2019 sale is live: here are the 10 best deals - TechRadar India", "The SEC recently quizzed Tesla about its accounting, filings show - MarketWatch", "Exclusive: Amazon's cloud unit readies more powerful data center chip - sources - Reuters", "Ford Mustang Mach-E First Edition Sold Out, Rivian-Based Lincoln SUV Planned - CleanTechnica", "Schwab Leaves San Francisco for Texas - The Wall Street Journal", "Dow Jones Futures Fall As Trump Signs Bill Backing…ing China Trade Fears - Investor's Business Daily", "When is Target open Thanksgiving and Black Friday?…re's when to shop for iPad, Xbox, TVs - USA TODAY", "When to hit the road to avoid Thanksgiving traffic in and around Seattle - KOMO News"],
    national: ['"Black hole: Astronomers discover massive black hol…ot even exist" in the Milky Way galaxy - CBS News"', "Better believe it: This Black Friday, Walmart is paying you to shop - Yahoo Lifestyle", "TIMBERWOLVES at SPURS | FULL GAME HIGHLIGHTS | November 27, 2019 - NBA", "Absent Kyrie Irving taunted in Boston, then speaks out on social media - ESPN", "Dealmaster: More Black Friday deals are now live, including AirPods for $129 [Update] - Ars Technica", "Ambassador Gordon Sondland Accused Of Sex Misconduct By Three Women - Deadline", "Navy Lets Accused SEALs Stay In Elite Unit - NPR", "Melissa Benoist Shares Her Story Of Domestic Viole…Schechter, Greg Berlanti Offer Support - Deadline", "Police in Utah found a woman dead in her apartment… discovered her husband's body in a freezer - CNN", "James Van Der Beek shares 'DWTS' body transformation with shirtless selfies - Fox News"],
    world: ["Trump Signs Hong Kong Democracy Legislation, Angering China", "‘Evo Morales Is Like a Father to Us’", "Iraq Protesters Burn Down Iran Consulate in Night of Anger", "Mexican Leader Draws Line on Trump Terrorist Plan: ‘Interventionism: No’", "Where the Nurse Prescribes Heroin", "Japan’s Support for Gay Marriage Is Soaring. But Can It Become Law?", "Godfrey Gao, ‘Mortal Instruments’ Actor, Dies While Filming TV Show", "In Scotland, Brexit Is on the Line. So Is the Future of the U.K.", "Sri Lankan Critics Fear a Crackdown Is Underway, and Some Flee", "Amid Death and Debris From Earthquake, Albania Clings to Hope"]
  },
  weather: {"type":"Clouds","description":"overcast clouds","icon":"04n","current":'44&#176F',"high": '47&#176F',"low": '41&#176F'}
}
