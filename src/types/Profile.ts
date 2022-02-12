import { objectType } from '@nexus/schema';

export const Profile = objectType({
    name: 'Profile',

    definition(t: any) {
        t.int('id');
        t.string('bio');
        t.string('location');
        t.string('website');
        t.string('avatar');
    }
});
