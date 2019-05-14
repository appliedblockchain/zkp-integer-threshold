// user: {
//   id: 123,
//   username: "Jhon Doe (#123)",
// },
// timestamp: 1557849798,
// encryptedAge: "012030120301230012031203010203012300123012030"
//
const encryptedAgeProofWithDetails = (id, username, encryptedAge) => (
  {
    user: {
      id: id,
      username: `${username} (#${id})`,
    },
    timestamp: new Integer(new Date()),
    encryptedAge: encryptedAge,
  }
)

// timestamp: 1557849798,
// encryptedAge: "012030120301230012031203010203012300123012030"
//
const encryptedAgeProof = (id, username, encryptedAge) => (
  {
    timestamp: new Integer(new Date()),
    encryptedAge: encryptedAge,
  }
)

module.exports = {
  encryptedAgeProofWithDetails,
  encryptedAgeProof
}
