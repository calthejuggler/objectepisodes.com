import React, { ReactFragment } from 'react';
export const checkStringForSearchAndBuild = (
	string: string,
	searchTerm: string
): ReactFragment => {
	if (string) {
		const searchString = string
			.toLowerCase()
			.indexOf(searchTerm.toLowerCase());
		if (searchTerm === '') return string;
		if (searchString === -1) return string;

		const splitString = string.split(searchTerm);
		let stringBuild: { bold: boolean; text: string }[] = [];

		splitString.forEach((section, i) => {
			if (i === 0) {
				if (searchString === 0) {
					stringBuild.push({
						text: searchTerm.toUpperCase(),
						bold: true,
					});
					stringBuild.push({
						text: section.slice(searchTerm.length),
						bold: false,
					});
				} else {
					stringBuild.push({
						text: section,
						bold: false,
					});
					stringBuild.push({
						text: searchTerm.toUpperCase(),
						bold: true,
					});
				}
			} else if (i === splitString.length - 1) {
				if (
					string
						.slice(searchTerm.length - (searchTerm.length - 1))
						.toLowerCase() === searchTerm.toLowerCase()
				) {
					stringBuild.push({
						text: section,
						bold: false,
					});
					stringBuild.push({
						text: searchTerm.toUpperCase(),
						bold: true,
					});
				} else {
					stringBuild.push({
						text: section,
						bold: false,
					});
				}
			} else {
				stringBuild.push({
					text: section,
					bold: false,
				});
				stringBuild.push({
					text: searchTerm.toUpperCase(),
					bold: true,
				});
			}
		});
		return stringBuild.map((section, i) =>
			section.bold ? (
				<b key={section.text + i}>{section.text}</b>
			) : (
				section.text
			)
		);
	} else return <></>;
};
