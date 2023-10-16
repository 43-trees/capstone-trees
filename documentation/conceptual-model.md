# Entities and Attributes

## Profile
- profileId - PK
- profileActivationToken
- profileEmail
- profileHash
- profileJoinDate
- profileName

## Tree
- treeId - PK
- treeProfileId - FK
- treeAddress
- treeEndDate
- treeDate
- treeImage
- treeInfo
- treeLat
- treeLng
- treeTitle
- treeSpecies

## Comment
- commentId - PK
- commentProfileId -FK
- commentTreeId - FK
- commentContent
- commentDateTime
- commentImageUrl

## Image
- imageId - PK
- imageTreeId -FK
- imageUrl

## Vote
- voteProfileId - FK
- voteTreeId - FK
- voteValue
