const layout = require("../layout")
const {getError} = require("../../helpers")

module.exports = ({errors}) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, "price")}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `,
  })
}

// form alone has a default method provided by the browser of GET, we must specify POST.
// Method: is how to transmit information GET=URL or POST=Body

// GET: the browser takes all the information out of the form adds it into the url of a request and then make a request to the backend server with that URL.

// POST: the browser takes all the information out of the form and puts it into the body of a POST request then makes a request to the backend server.

// enctype: encoding type for bundling and safe transport of info.
// default value = enctype="application/x-www-form-urlencode -  we will use (multipart/form-data) which breaks up the data being sent into parts incase the data is large"
