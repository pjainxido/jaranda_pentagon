/**
 * Firebase cloudstore menu collection data types
 *  menu [
 *    {
 *       id: string,
 *       name: string,
 *       route: string
 *    }
 *  ]
 */

import { db } from 'firebase.js';

export const getAllRoles = () => {
	return db
		.collection('role')
		.get()
		.then((querySnapshot) => {
			const result = [];
			querySnapshot.forEach((doc) => {
				result.push({ ...doc.data(), id: doc.id });
			});
			return result;
		})
		.catch((error) => {
			console.error(error);
		});
};

/**
 * 권한별 메뉴 관리용
 * @param {*} id(string, ex: 'parent' ; 권한 이름 데이터)
 * @param {*} menu(object, 예시 형식은 파일 최상단에서 확인 가능)
 */
export const adjustRoleForMenu = (id, menu) => {
	return db.collection('role_test').doc(id).set(menu);
	// .then(() => {
	// 	console.log('Document successfully written!');
	// })
	// .catch((error) => {
	// 	console.error('Error writing document: ', error);
	// });
};
