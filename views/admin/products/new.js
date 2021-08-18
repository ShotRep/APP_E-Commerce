const layout = require("../layout")
const {getError} = require("../../helpers")

module.exports = ({errors}) => {
  return layout({
    content: `
      <form method="POST" enctype="multipart/form-data">
        <input placeholder="Title" name="title" />
        ${getError(errors, "title")}
        <input placeholder="Price" name="price" />
        ${getError(errors, "price")}
        <input type="file" name="image" />
        <button>Submit</button>
      </form>
    `,
  })
}

// form alone has a default method provided by the browser of GET, we must specify POST.
// Method: is how to transmit information GET=URL or POST=Body

// GET: the browser takes all the information out of the form adds it into the url of a request and then make a request to the backend server with that URL.

// POST: the browser takes all the information out of the form and puts it into the body of a POST request then makes a request to the backend server.

// enctype: encoding type for bundling and safe transport of info.
// default value = enctype="application/x-www-form-urlencode -  we will use (multipart/form-data) which breaks up the data being sent into parts incase the data is large"
