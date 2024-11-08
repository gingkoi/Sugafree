import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  

  export const appwriteConfig = {
    endpoint: "ENDPOINT_ID",
    platform: "PLATFORM_ID",
    projectId: "PROJECT_ID",
    databaseId: "DATABASE_ID",
    userCollectionId: "COLLECTION_ID",
    storageId: "STORAGE_ID",
    articleCollectionId: "ARTICLE_ID",
    bookmarkCollectionId: "SAVED_ARTICLE_ID",
    recipeCollectionId: "RECIPE_ID",
    savedRecipeCollectionId: "SAVED_RECIPE_ID",
    journalCollectionId: "JOURNAL_ID",
    profileCollectionId: "PROFILE_ID"
  };
  
  const client = new Client();
  
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);
  
  const account = new Account(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);
  
  // Register user
  export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Sign In
  export async function signIn(email, password) {
    try {
      // const session = await account.createEmailSession(email, password);
      const session = await account.createEmailPasswordSession(email,password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get Account
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get Current User
  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Sign Out
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");

      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get all Articles Posts
  export async function getAllPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.articleCollectionId
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get article posts created by user
  export async function getUserPosts(userId) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.articleCollectionId,
        [Query.equal("users", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }  
  
  // Get recipe posts created by user
  export async function getUserRecipes(userId) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.recipeCollectionId,
        [Query.equal("users", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get article posts that matches search query
  export async function searchPosts(query) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.articleCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }  
  
  // Get recipes that matches search query
  export async function searchRecipes(query) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.recipeCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get latest created article posts
  export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.articleCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }  
  
  // Get ADMIN article posts
  export async function getAdminPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.articleCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get a Single Article Post by Document ID
export async function getSinglePost(documentId) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,            // Database ID
      appwriteConfig.articleCollectionId,    // Collection ID
      documentId                             // Document ID (Article ID)
    );
  
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
}  

// Get a Single Article Post by Document ID
export async function getSingleRecipe(documentId) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,            // Database ID
      appwriteConfig.recipeCollectionId,    // Collection ID
      documentId                             // Document ID (Article ID)
    );
  
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to bookmark an admin's post
export async function bookmarkPost(userId, postId) {
  try {
    // First, check if the user already bookmarked this post
    const existingBookmarks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarkCollectionId,  // Collection for bookmarks
      [Query.equal('userId', userId), Query.equal('postId', postId)]
    );

    if (existingBookmarks.total > 0) {
      throw new Error('Post is already bookmarked');
    }

    // If not already bookmarked, create a new bookmark
    const response = await databases.createDocument(
      appwriteConfig.databaseId,           // Database ID
      appwriteConfig.bookmarkCollectionId,  // Collection ID for bookmarks
      ID.unique(),                          // Unique document ID for the bookmark
      {
        userId: userId,                     // The user who is bookmarking
        postId: postId                      // The post being bookmarked (admin's post)
      }
    );

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to bookmark an admin's recipe
export async function savedRecipePost(userId, postId) {
  try {
    // First, check if the user already bookmarked this post
    const existingBookmarks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savedRecipeCollectionId,  // Collection for bookmarks
      [Query.equal('userId', userId), Query.equal('recipeId', postId)]
    );

    if (existingBookmarks.total > 0) {
      throw new Error('Post is already bookmarked');
    }

    // If not already bookmarked, create a new bookmark
    const response = await databases.createDocument(
      appwriteConfig.databaseId,           // Database ID
      appwriteConfig.savedRecipeCollectionId,  // Collection ID for bookmarks
      ID.unique(),                          // Unique document ID for the bookmark
      {
        userId: userId,                     // The user who is bookmarking
        recipeId: postId                      // The post being bookmarked (admin's post)
      }
    );

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to get all bookmarked posts by a user
export async function getUserBookmarks(userId) {
  try {
    const bookmarks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarkCollectionId,
      [Query.equal('userId', userId)]   // Filter by userId to get the user's bookmarks
    );

    // Returning the bookmarked post IDs
    return bookmarks.documents.map(bookmark => bookmark.postId);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to get all bookmarked posts by a user
export async function getUserSavedRecipes(userId) {
  try {
    const bookmarks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savedRecipeCollectionId,
      [Query.equal('userId', userId)]   // Filter by userId to get the user's bookmarks
    );

    // Returning the bookmarked post IDs
    return bookmarks.documents.map(bookmark => bookmark.recipeId);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeBookmark(userId, postId) {
  try {
    // Query to find the specific bookmark document
    const bookmark = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarkCollectionId,
      [Query.equal('userId', userId), Query.equal('postId', postId)]
    );

    if (bookmark.total > 0) {
      // Assuming only one document returned, you can delete the bookmark
      const bookmarkId = bookmark.documents[0].$id;
      await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.bookmarkCollectionId, bookmarkId);
    } else {
      throw new Error('Bookmark not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeSavedRecipe(userId, postId) {
  try {
    // Query to find the specific bookmark document
    const bookmark = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savedRecipeCollectionId,
      [Query.equal('userId', userId), Query.equal('recipeId', postId)]
    );

    if (bookmark.total > 0) {
      // Assuming only one document returned, you can delete the bookmark
      const bookmarkId = bookmark.documents[0].$id;
      await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.savedRecipeCollectionId, bookmarkId);
    } else {
      throw new Error('Bookmark not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function checkIfBookmarked(userId, postId) {
  try {
      // Query the bookmarks collection to check if the user has bookmarked the post
      const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.bookmarkCollectionId,
          [Query.equal("userId", userId), Query.equal("postId", postId)]
      );
      return response.total > 0;  // Return true if at least one result is found
  } catch (error) {
      throw new Error(error.message);
  }
}


export async function checkIfSavedRecipe(userId, postId) {
  try {
      // Query the bookmarks collection to check if the user has bookmarked the post
      const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.savedRecipeCollectionId,
          [Query.equal("userId", userId), Query.equal("recipeId", postId)]
      );
      return response.total > 0;  // Return true if at least one result is found
  } catch (error) {
      throw new Error(error.message);
  }
}

export async function getMultiplePostsByIds(documentIds) {
  if (!documentIds || documentIds.length === 0) {
    throw new Error("No document IDs provided.");
  }

  try {
    // Map through documentIds and fetch each document individually
    const promises = documentIds.map(async (id) => {
      try {
        return await databases.getDocument(
          appwriteConfig.databaseId, 
          appwriteConfig.articleCollectionId, 
          id
        );
      } catch (error) {
        console.warn(`Failed to fetch document with ID: ${id}. Error: ${error.message}`);
        return null;  // Return null for failed documents
      }
    });

    // Wait for all promises to resolve
    const posts = await Promise.all(promises);

    // Filter out any null responses (failed fetches)
    return posts.filter(post => post !== null);
  } catch (error) {
    throw new Error("Error fetching multiple posts: " + error.message);
  }
}

export async function getMultipleRecipesByIds(documentIds) {
  if (!documentIds || documentIds.length === 0) {
    throw new Error("No document IDs provided.");
  }

  try {
    // Map through documentIds and fetch each document individually
    const promises = documentIds.map(async (id) => {
      try {
        return await databases.getDocument(
          appwriteConfig.databaseId, 
          appwriteConfig.recipeCollectionId, 
          id
        );
      } catch (error) {
        console.warn(`Failed to fetch document with ID: ${id}. Error: ${error.message}`);
        return null;  // Return null for failed documents
      }
    });

    // Wait for all promises to resolve
    const posts = await Promise.all(promises);

    // Filter out any null responses (failed fetches)
    return posts.filter(post => post !== null);
  } catch (error) {
    throw new Error("Error fetching multiple posts: " + error.message);
  }
}


// Journal
export async function createJournal(userId, entryText, dateTime, mealType, glucose_level) {
  try {
     const response = await databases.createDocument(
        appwriteConfig.databaseId, 
        appwriteConfig.journalCollectionId, 
        ID.unique(), 
        {
          userId: userId,
          entry: entryText,
          date: dateTime,
          mealType: mealType,
          glucose_level: glucose_level
        }
     );
     console.log('Journal created:', response);
  } catch (error) {
     console.error('Error creating journal:', error);
  }
};

export async function editJournal (documentId, updatedText, updatedDateTime){
  try {
     const response = await databases.updateDocument(
        appwriteConfig.databaseId, 
        appwriteConfig.journalCollectionId,  
        documentId, 
        {
           entry: updatedText,
           date: updatedDateTime
        }
     );
     console.log('Journal updated:', response);
  } catch (error) {
     console.error('Error updating journal:', error);
  }
};

export async function deleteJournal (documentId) {
  try {
     const response = await databases.deleteDocument(
        appwriteConfig.databaseId, 
        appwriteConfig.journalCollectionId,  
        documentId
     );
     console.log('Journal deleted:', response);
  } catch (error) {
     console.error('Error deleting journal:', error);
  }
};

export async function getJournalsByDate (userId, selectedDate){
  try {
     const response = await databases.listDocuments(
        appwriteConfig.databaseId, 
        appwriteConfig.journalCollectionId, 
        [
           Query.equal('userId', userId),
           Query.equal('date', selectedDate) // Filter by specific date
        ]
     );
     console.log('Journals:', response.documents);
  } catch (error) {
     console.error('Error fetching journals:', error);
  }
};


export async function fetchJournals(userId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.journalCollectionId,
      [
        Query.equal('userId', userId), // Query to filter by userId
        Query.orderDesc('$createdAt') 
      ] 
    );
    return response.documents; // Return the fetched documents
  } catch (error) {
    console.error('Error fetching journals:', error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchLatestJournal(userId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.journalCollectionId,
      [
        Query.equal('userId', userId), // Query to filter by userId
        Query.orderDesc('$createdAt'),   // Sort by createdAt in descending order
        Query.limit(1)                  // Limit the result to 1 document
      ]
    );
    return response.documents[0] || null; // Return the first document (most recent), or null if none found
  } catch (error) {
    console.error('Error fetching latest journal:', error);
    return null; // Return null in case of an error
  }
}


// Profile

export async function createProfile(userId,gender,age,height,weight,race,type) {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.profileCollectionId, 
      ID.unique(), 
      {
        userId: userId,  // Make sure userId is included in the document
        gender:gender,
        age:age,
        height:height,
        weight:weight,
        race:race,
        type:type
      }
    );
    console.log('Profile created:', response);
  } catch (error) {
    console.error('Error creating profile:', error);
  }
}

export async function getProfile(userId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.profileCollectionId, 
      [Query.equal('userId', userId)] // Query to filter by userId
    );
    // return response.documents; // Return the fetched documents
    // console.log("From appwrite",response.documents[0])
    return response.documents[0]
  } catch (error) {
    console.error('Error fetching journals:', error);
    return []; // Return an empty array in case of an error
  }
}


export async function updateProfileId(profileId, gender, age, height, weight, race, type) {
  try {
    const response = await databases.updateDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.profileCollectionId, 
      profileId, 
      {
        gender: gender,
        age: age,
        height: height,
        weight: weight,
        race: race,
        type: type
      }
    );
    console.log('Profile updated:', response);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}

export async function getProfileId(userId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.profileCollectionId, 
      [Query.equal('userId', userId)] // Query to filter by userId
    );
    
    // Check if a profile exists for the user
    if (response.documents.length > 0) {
      const profile = response.documents[0];  // Get the first document
      return profile.$id;  // Return the profileId ($id)
    } else {
      console.log('No profile found for user');
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null; // Return null in case of an error
  }
}


// Troubleshooting
