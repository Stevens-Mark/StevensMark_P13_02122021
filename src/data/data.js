
// Data used for the "features or slogans" list on home page
import chat from '../assets/images/icon-chat.png'
import money from '../assets/images/icon-money.png'
import security from '../assets/images/icon-security.png'

export const featureData = [
	{
		id: "f1",
    icon: chat,
    altText: "Chat",
		title: "You are our #1 priority",
		content: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
	},
	{
		id: "f2",
    icon: money,
    altText: "Money",
		title: "More savings means higher rates",
		content: "The more you save with us, the higher your interest rate will be!"
	},
		{
		id: "f3",
    icon: security,
    altText: "Security",
		title: "Security you can trust",
		content: "We use top of the line encryption to make sure your data and money is always safe."
	},
]


// Data used to fill in the user transaction page

export const AccountData = [
	{
		id: "a1",
 		title: "Argent Bank Checking (x8349)",
		amount: 2082.79,
    description: "Available Balance",
 	},
	{
		id: "a2",
 		title: "Argent Bank Savings (x6712)",
		amount: 10928.42,
    description: "Available Balance",
	},
		{
    id: "a3",
    title: "Argent Bank Credit Card (x8349)",
    amount: 184.30,
    description: "Current Balance",
	},
]