export type CustomerData = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    payment?: Payment;
};

export type Payment = {
    nameOnCard: string;
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
};