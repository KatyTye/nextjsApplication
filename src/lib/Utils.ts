export function fixSourceURL(source: string) {
	const url = new URL(source)
	url.host = "nextdyrapi.onrender.com"
	url.protocol = "https"
	url.port = "443"
	return url
}
export const imageRegex = /([^/\d]+)$/

export const isTimeValid = (validUntil: number): boolean => ((validUntil * 1000) >= new Date().getTime())