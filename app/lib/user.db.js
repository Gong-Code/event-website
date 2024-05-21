import * as admin from 'firebase-admin';

admin.initializeApp();

async function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    const users = listUsersResult.users.map((userRecord) => userRecord.toJSON());

    if (listUsersResult.pageToken) {
        // List next batch of users.
        return users.concat(await listAllUsers(listUsersResult.pageToken));
    }

    return users;
}

// Start listing users from the beginning, 1000 at a time.
listAllUsers().then(users => console.log(users));