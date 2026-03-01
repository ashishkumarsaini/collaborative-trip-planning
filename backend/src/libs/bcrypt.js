import bcrypt from 'bcrypt';

export const getBcryptHashed = (data) => bcrypt.hash(data, 10);

export const compareBcryptHashedData = (data, encyptedData) => bcrypt.compare(data, encyptedData);
