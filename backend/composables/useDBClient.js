import mongoose from 'mongoose';

export default function () {
    const init = () => {
        mongoose.connect('mongodb://127.0.0.1:27017/upwork-task')
            .then(() => console.log('MongoDB connected...'))
            .catch(err => console.log(err));
    }

    return { init }
}
