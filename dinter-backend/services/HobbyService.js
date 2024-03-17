import Hobby from "../models/Hobby.js";

const getAllHobby = async (limit, offset, keyWord) => {
    try {
        let query = {};

        // If the keyword is not empty, add it to the query
        if (keyWord && keyWord !='_') {
            query = { hobbyName: { $regex: keyWord, $options: 'i' } };
        }

        // Use the `find` method with the query object
        const hobbies = await Hobby.find(query)
            .exec();

        // Only sort if the keyword is not empty
        if (keyWord) {
            hobbies.sort((a, b) => {
                const aIndex = a.hobbyName.toLowerCase().indexOf(keyWord.toLowerCase());
                const bIndex = b.hobbyName.toLowerCase().indexOf(keyWord.toLowerCase());
                return aIndex - bIndex;
            });
        }

        // Apply limit and offset
        const slicedHobbies = hobbies.slice(Number(offset), Number(offset) + Number(limit));

        return slicedHobbies;
    } catch (error) {
        throw new Error(error.toString());
    }
};

export default {
    getAllHobby
}
