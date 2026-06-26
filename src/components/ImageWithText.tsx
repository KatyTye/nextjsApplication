interface ComponentProps {
	imageSource: string;
	description: string;
	title: string;
}

export default function ImageWithText({ imageSource, title, description }: ComponentProps) {

	return (
		<figure className="w-full h-87.5 overflow-hidden oswald phone-height relative">
			<img src={imageSource} alt="image of something"
				className="w-full transform-[translateY(-30%)] phone-image" loading="lazy" />
			<figcaption className="absolute top-0.5 h-full text-white p-15 pl-37.5 pr-37.5 w-full phone-padding">
				<h2 className="text-6xl">
					{title}
				</h2>
				<p className="mt-3 text-2xl">
					{description}
				</p>
			</figcaption>
		</figure>
	)
}