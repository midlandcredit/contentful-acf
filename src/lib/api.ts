/**
 MAY HAVE TO CREATE DIFFERENT FILES TO SEPARATE FETCHING DATA FOR EACH CONTENT MODAL
 * 
 in this file this is where we create all our API calls from GraphQL 
 */

 //this is all of the fields in the content in each of the content model
 const navigateCollection = `
  buttonTitle
  buttonUrl
  buttonTitle2
  buttontUrl2
  logo {
    title
    url
  }
  menuTitle1
  menuTitle2
  servicedBy {
    json
    links {
      entries {
        inline {
          sys {
            id
          }
          ... on PhoneNumber {
            phoneNumber
          }
        }
      }
    }
  }
`
const footerCollection = `
  number
  title
  text {
    json
    links {
      entries {
        inline {
          sys {
          id
        }
        ... on PhoneNumber {
        phoneNumber
      }
    }
  }
    }
  }
  image {
    url
  }
`
const homePageCollection = `
   number
      title 
      heroBanner {
        ... on LandingPage {
          title
          buttonText
          buttonUrl
          footer
          heroImage {
            image {
              url
            title
            }
          }
        }
      }
      text {
        json
        links {
          entries {
            inline {
              sys {
                id
              }
              ... on PhoneNumber {
                phoneNumber
              }
            }
          }
        }
      }
      buttonText
      buttonUrl
      attachmentsCollection {
        items {
          __typename
          ... on CtaButtons {
            title
            buttonText
            buttonUrl
            phoneNumber {
              phoneNumber
            }
            image {
              url
            }
          }
        }
      }
`
const homeLandingPageCollection = `
  title
      text {
        json
        links {
          entries {
            inline {
              sys {
                id
              }
            } 
          }
        }
      }
      slug
      buttonText
      buttonUrl
      footer
      heroImageDesktop {
          url
      }
      heroImageMobile {
          url
      }
`
const aboutUsCard = `
  title
  subheader
  buttonText
  buttonUrl
  footer
  align
  content {
    json
    links {
      entries {
        inline {
          sys {
            id
          }
          ... on PhoneNumber {
            phoneNumber
          }
        }
      }
    }
  }
`
const faqsCards = `
  title
  subheader
  number
  buttonText
  buttonUrl
  footer
  align
  content {
    json
    links {
      entries {
        inline {
          sys {
            id
          }
          ... on PhoneNumber {
            phoneNumber
          }
        }
      }
    }
  }
`
const faqsSectionCollection = `
  title
  order
  questionsCollection(limit: 5) {
    items {
      question
      answer {
        json
        links {
          entries {
            inline {
              sys {
                id
              }
              ... on PhoneNumber {
                phoneNumber
              }
            }
          }
        }
      }
      buttonText
      buttonUrl
    }
  }
`

// get requets, thinking of making this dynamic for all the get request... but the fields are different for each content type\
//not sure what this slug is yet and how important it maye be: authorCollection(where: { slug_exists: true }, order: date_DESC, preview:
export async function getNavCollection(isDraftMode: boolean): Promise<any[]> {
const entries = await fetchGraphQL(
 `query {
   navigationBarCollection(preview: ${
     isDraftMode ? "true" : "false"
   }, limit: 5) {
     items {
       ${navigateCollection}
     }
   }
 }`,
 isDraftMode,
);
// console.log('what is entries: ', entries)
return extractPostEntries(entries, 'navigationBarCollection');
}

//this will query the footer collection
export async function getFooterCollection(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
   `query {
     footerCollection(preview: ${
       isDraftMode ? "true" : "false"
     }, limit: 5, order: number_ASC) {
       items {
         ${footerCollection}
       }
     }
   }`,
   isDraftMode,
   
  );
  // console.log('entries for FOOTER COLLECTION: ', entries)
  return extractPostEntries(entries, 'footerCollection');
  }

//this will query ONLY the Home Page Collection
export async function getHomePageCollection(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
   `query {
     bodyCollection(preview: ${
       isDraftMode ? "true" : "false"
     }, limit: 1, where: {title: "Home Page"}) {
       items {
         ${homePageCollection}
       }
     }
   }`,
   isDraftMode,
  );
  // console.log('entries for home page collection: ', entries)
  return extractPostEntries(entries, 'bodyCollection');
  };


//this will query ONLY the Home Page Collection
export async function getFaqsSectionCollection(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
   `query {
     faqsSectionCollection(preview: ${
       isDraftMode ? "true" : "false"
     }, limit: 2, order: order_ASC) {
       items {
         ${faqsSectionCollection}
       }
     }
   }`,
   isDraftMode,
  );
  // console.log('entries for home page collection: ', entries)
  return extractPostEntries(entries, 'faqsSectionCollection');
  };

  //this will query ONLY the Home Page Collection
export async function getAboutUsCardCollection(isDraftMode: boolean, cardType: string, order: boolean): Promise<any[]> {
  const item = cardType === 'About Us' ? aboutUsCard : faqsCards;
  const orderClause = order ? "order: number_ASC" : "";
  const entries = await fetchGraphQL(
   `query {
     cardCollection(preview: ${
       isDraftMode ? "true" : "false"
     }, limit: 2, where: {page: "${cardType}"}, ${orderClause}) {
       items {
         ${item}
       }
     }
   }`,
   isDraftMode,
  );
  // console.log('entries for about us card collection: ', entries)
  return extractPostEntries(entries, 'cardCollection');
  };

  //this will ne query for ONLY the About Us Card in the cardCollection... not sure how I would do the entire
  //collection and split it up.... 
export async function getHomeLandingPageCollection(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
   `query {
     landingPageCollection(preview: ${
       isDraftMode ? "true" : "false"
     }, limit: 1) {
       items {
         ${homeLandingPageCollection}
       }
     }
   }`,
   isDraftMode,
  );
  console.log('entries for home page collection: ', entries)
  return extractPostEntries(entries, 'landingPageCollection');
  };

  
//not sure if I should make other functions that will also fetch content in contentful... 
//need to figure out how im going to make this work as if there will be no devloper
//but aslo this is only for the smaller websites

//this function extracts the collection... okay
function extractPostEntries(fetchResponse: any, collection: string): any[] {
return fetchResponse?.data?.[collection]?.items;
};



async function fetchGraphQL(query: string, preview = false): Promise<any> {
return fetch(
 `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
 {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${
       preview
         ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
         : process.env.CONTENTFUL_ACCESS_TOKEN
     }`,
     
   },
   body: JSON.stringify({ query }),
   next: { tags: ["posts"] },
 },
).then((response) => response.json());
};