import React from 'react'
import RTE from 'react-quill'
//import ReactMarkdown from 'react-markdown'
//<ReactMarkdown source={this.props.post.content} />

export default class Content extends React.Component {

	render() {
		const url = this.props.url
		const type = url.type
		if (!this.props.post.rich) {
			return type === 'edit' && this.props.owner || type === 'create'
			? <textarea onChange={this._content.bind(this)} value={this.props.post.content} />
			: <div className="content">{this.props.post.content}</div>
		}
		return type === 'edit' && this.props.owner || type === 'create'
		? <TextEditor post={this.props.post} rich={this._rich.bind(this)} />
		: <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>
	}

	_content(e) {
		this.props.actions.change('content', e.currentTarget.value)
	}

	_rich(value) {
		this.props.actions.change('content', value)
	}
}

const TextEditor = ({post, rich}) => {
	if (!post.hasOwnProperty('content')) {
		return <span></span>
	}

	let content = post.content || "Enter content here"
	return (
		<div className="rte">
			<RTE value={content} onChange={rich.bind(this)} theme="snow" />
		</div>
	)
}
