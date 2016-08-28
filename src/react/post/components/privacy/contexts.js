import React from 'react'

export default ({session, post, select}) => {

	const orgs = session.orgs || []
  return (
    <div className="contexts">
			<select onChange={select} value={post.orgId}>
				<option value="null">Post on my behalf</option>
				{orgs.map((item) => {
					if (item.approved !== true) {
						return <span></span>
					}
					return (
						<option value={item.org.id}>
							{item.org.name}
						</option>
					)
				})}
			</select>
    </div>
  )
}
