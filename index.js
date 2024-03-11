const axios = require('axios');

const api = "https://api.github.com/repos/utnim2/CI-CD-test/pulls/5/commits"

// async function main(){
//     try{
//         const response = await axios.get(api)
//         const data = response.data
//         const req_data = data.map(data => ({
//             name: data.commit.author.name,
//             email: data.commit.author.email,
//             login: data.committer.login,
//             commiter: data.commit.committer,
//           }))
//         //   console.log(req_data)
//         const allow = req_data.filter( author => author.name !== author.committer )
//         console.log(allow)
//     } catch (error){
//         console.log(error)
//     }
// }

// main()

async function getCoAuthors() {
    try {
            const response = await axios.get(api)
            const commitsResponse = response.data
      
            const authors = commitsResponse
        .map(data => ({
          name: data.commit.author.name,
          email: data.commit.author.email,
          login: data.commit.author.login,
          committer: data.commit.committer
        }))
        .filter(author => author.email !== commitsResponse[0].commit.author.email)
        .reduce((uniqueAuthors, author) => {
          if (!uniqueAuthors.some(a => a.email === author.email)) {
            uniqueAuthors.push(author);
          }
          return uniqueAuthors;
        }, [])
        .map(author => `Co-authored-by: ${author.name} <${author.email}>`)
        .join('\n');
      console.log(authors);
      return authors;
    } catch (error) {
      console.error('Error fetching commits:', error);
      return null;
    }
  }
  
getCoAuthors();