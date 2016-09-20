import { call, put, take, spawn, select } from 'redux-saga/effects'

import posts from '../../../../api/posts'
import * as selectors from '../selectors'

export default function* post() {
  yield [
    spawn(single),
    spawn(create),
    spawn(save),
    spawn(trash)
  ]
}

function* single() {
  while (true) {
    try {
      const action = yield take('POST_SINGLE')
      yield put({type: 'REQUEST_POST_SINGLE'})
      if (action.id === 'create') {
        yield put({type: 'RECEIVE_POST_SINGLE', id: action.id, post: {
          type: 'blog',
          title: 'Enter your post title here',
          content: CREATE_CONTENT
        }})
      } else {
        const post = yield call(posts.single, action.id)
        yield put({type: 'RECEIVE_POST_SINGLE', id: action.id, post})
      }
    } catch (code) {
      const alert = {
        action: 'single',
        color: 'red',
        code,
        msg: 'Post could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* create() {
  while (true) {
    const action = yield take('POST_CREATE')
    let alert = {
      action: 'create',
      color: 'green',
      code: 201,
      msg: 'Post created successfully'
    }
    try {
      const changes = yield select(selectors.changes)
      yield call(posts.add, changes)
    } catch (code) {
      alert = {
        action: 'create',
        color: 'red',
        code,
        msg: 'Post could not be created'
      }
    }
    yield put({type: 'ALERT', alert})
  }
}

function* save() {
  while (true) {
    const action = yield take('POST_SAVE')
    let alert = {
      action: 'save',
      color: 'green',
      code: 204,
      msg: 'Post saved successfully'
    }
    try {
      const id = yield select(selectors.id)
      const changes = yield select(selectors.changes)
      yield call(posts.save, id, changes)
    } catch (code) {
      alert = {
        action: 'save',
        color: 'red',
        code,
        msg: 'Post could not be saved'
      }
    }
    yield put({type: 'ALERT', alert})
  }
}

function* trash() {
  while (true) {
    const action = yield take('POST_TRASH')
    let alert = {
      action: 'delete',
      color: 'green',
      code: 202,
      msg: 'Post deleted successfully'
    }
    try {
      const id = yield select(selectors.id)
      yield call(posts.remove, id)
    } catch (code) {
      alert = {
        action: 'delete',
        color: 'red',
        code,
        msg: 'Post could not be deleted'
      }
    }
    yield put({type: 'ALERT', alert})
  }
}

const CREATE_CONTENT = `# Creating a Post

To create a post on Phourus, you can quickly clear or replace the text in this box, and use the formatting toolbar above. When you are finished, click 'Post' to publish your post. If you wish not to save your work, then just click cancel instead.

There are 4 different categories of posts on Phourus, each color coded:

* General information - Green [Blogs, Ideas]
* Educational - Blue [Subjects, Questions]
* Divisionary - Red [Debates, Polls]
* Cultural - Gold [Opinions, Quotes]

## Research
Whenever research is being done, Phourus should come to mind. The ideal place to store, find and centralize research done in a variety of departments.

* Market analysis
* Data-driven conclusions
* Engineering research
* Competitor research
* Doctorate/Post-Grad Thesis
* Theoretical research
* Medical information

## Training
Having a go-to source for new employees to go for a variety of information such as:

* Company policy
* Product or service information
* Latest research or findings
* Company vision or mission
* Training resource
* Question about company or product
* Budget or financial information
* Product specs
* Support material

## Public
With advanced post permissions you can create posts to interact with the public such as:

* Poll most important product features
* Educate consumers, prospects or customers
* Report news to customers, investors or shareholders
* Discuss company direction

## Feedback
Internal and external feedback is imperative to an organization:

* Business strategy or overall vision
* The good, bad or ugly
* Internal poll for a challenging decision
* Cross-department collaboration
* Management feedback
* Debate purchasing decisions

## Ideas
Ideas for new products, campaigns, strategies are j

* Idea for product or service
* Improve internal operations
* New procedure idea
* Marketing campaign idea
* Customer ideas

## Vision
Ideas, opinions and inspiration serve as important keys to success:

* Goal for the organization or team
* Personal opinion
* Inspirational quote
* Sales pitch tip
* Marketing or sales strategy
* Poor experience`;
//const CreateContent = `<div><span style="font-size: 32px;">Creating a Post</span></div><div><br></div><div>To create a post on Phourus, you can quickly clear or replace the text in this box, and use the formatting toolbar above. When you are finished, click 'Post' to publish your post. If you wish not to save your work, then just click cancel instead. </div><div><br></div><div><i>There are 4 different categories of posts on Phourus, each color coded:</i></div><div><br></div><ol><li><b>General information</b> - Green [Blogs, Ideas]</li><li><b>Educational</b> - Blue [Subjects, Questions]</li><li><b>Divisionary</b> - Red [Debates, Polls]</li><li><b>Cultural</b> - Gold [Opinions, Quotes] </li></ol><div><br></div><div><i><u><b>Research</b></u></i></div><div>Whenever research is being done, Phourus should come to mind. The ideal place to store, find and centralize research done in a variety of departments.</div><div><br></div><div>- Market analysis</div><div>- Data-driven conclusions</div><div>- Engineering research</div><div>- Competitor research</div><div>- Doctorate/Post-Grad Thesis</div><div>- Theoretical research</div><div>- Medical information</div><div><br></div><div><u style="background-color: inherit;"><i><b>Training</b></i></u></div><div>Having a go-to source for new employees to go for a variety of information such as:</div><div><br></div><div>- Company policy</div><div>- Product or service information</div><div>- Latest research or findings</div><div>- Company vision or mission</div><div>- Training resource</div><div>- Question about company or product</div><div>- Budget or financial information</div><div>- Product specs</div><div>- Support material</div><div><br></div><div><u style="background-color: inherit;"><i><b>Public</b></i></u></div><div>With advanced post permissions you can create posts to interact with the public such as:</div><div><br></div><div>- Poll most important product features</div><div>- Educate consumers, prospects or customers</div><div>- Report news to customers, investors or shareholders</div><div>- Discuss company direction</div><div><br></div><div><u style="background-color: inherit;"><i><b>Feedback</b></i></u></div><div>Internal and external feedback is imperative to an organization:</div><div><br></div><div>- Business strategy or overall vision</div><div>- The good, bad or ugly</div><div>- Internal poll for a challenging decision</div><div>- Cross-department collaboration</div><div>- Management feedback</div><div>- Debate purchasing decisions</div><div><br></div><div><i><u><b>Ideas</b></u></i></div><div>Ideas for new products, campaigns, strategies are j</div><div><br></div><div>- Idea for product or service</div><div>- Improve internal operations</div><div>- New procedure idea</div><div>- Marketing campaign idea</div><div>- Customer ideas</div><div><br></div><div><i><u><b>Vision</b></u></i></div><div>Ideas, opinions and inspiration serve as important keys to success:</div><div><br></div><div>- Goal for the organization or team</div><div>- Personal opinion&nbsp;</div><div>- Inspirational quote</div><div>- Sales pitch tip</div><div>- Marketing or sales strategy</div><div>- Poor experience</div><div><br></div><div><br></div><div><br></div>`;
