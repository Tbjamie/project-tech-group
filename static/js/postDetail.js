const commentCount = document.querySelector('#postDetail section:nth-of-type(2) > div:last-of-type p:first-of-type')

const commentCountTextChange = () => {
        if(commentCount.innerText == 1) {
            commentCount.innerText = `${commentCount.innerText} Comment`
        } else {
            commentCount.innerText = `${commentCount.innerText} Comments`
        }
    }

commentCountTextChange()