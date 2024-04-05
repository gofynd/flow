import React from 'react';

const styles = {
	cardWrapper: {
		padding: '10px',
	},
	imageWrapper: {
		width: '380px',
		minHeight: '250px',
	},
	image: {
		width: '380px',
	},
};

export function BlogCard({ blog = {} }) {
	const {
		title,
		feature_image: featureImage = {},
		seo = {},
		date_meta: dateMeta = {},
		author = {},
	} = blog;

	const {
		created_on: createdOn = '',
		modified_on: modifiedOn = '',
	} = dateMeta;

	const {
		title: seoTitle = '',
		description: seoDescription = '',
	} = seo;

	const {
		secure_url: imageURL = '',
	} = featureImage;

	const {
		name,
	} = author;

	return (
		<div className="blog-card" style={styles.cardWrapper} data-testid="blog-card-wrapper">
			{
				imageURL ? (
					<div className="image-wrap" style={styles.imageWrapper} data-testid="image-wrapper">
						<img src={imageURL} alt={seoTitle} style={styles.image} data-testid="blog-image" />
					</div>
				) : null
			}

			<h2>{ title }</h2>
			<p>{ seoDescription }</p>
			<p>
				{' '}
				By
				{' '}
				{ name }
			</p>
			<p>
				Created On:
				{' '}
				{ createdOn }
			</p>
			<p>
				Modified On:
				{' '}
				{ modifiedOn }
			</p>
		</div>
	);
}
