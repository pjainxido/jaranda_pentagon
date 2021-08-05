/**
 * Firebase cloudstore user collection data types
 *  userId : string
 *  role: string
 *  name: string
 *  password: string
 *  age: number
 *  address: string
 *  creditCard: {
 *    cardNumber: number,
 *    expiryDate: number,
 *    cvc: number
 *  }
 */

import { db, firebaseInstance } from 'firebase.js';

// 이전에 사용하던 함수
// export const createUser = ({ userId, password, role = 'parent', name, age, address, creditCard }) => {
// 	return db.collection('user').add({
// 		userId,
// 		role,
// 		name,
// 		password,
// 		age,
// 		address,
// 		creditCard,
// 		createdAt: firebaseInstance.firestore.Timestamp.now(),
// 	});
// };

// 이전에 사용하던 함수
// export const getAllUsers = () => {
// 	return db
// 		.collection('user')
// 		.get()
// 		.then((querySnapshot) => {
// 			const result = [];
// 			querySnapshot.forEach((doc) => {
// 				// console.log({ ...doc.data(), id: doc.id });
// 				result.push({ ...doc.data(), id: doc.id });
// 			});
// 			return result;
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };

export const getAllUsers = () => {
	return db.collection('user_test').doc('users1').get();
};

export const createUser = async ({ userId, password, role = 'parent', name, age, address, creditCard }) => {
	// 기존 유저 리스트 배열 받아옴
	const res = await getAllUsers();
	const users = res.data()?.list;

	// 생성할 유저 배열 제일 앞에 추가
	users.unshift({
		userId,
		role,
		name,
		password,
		age,
		address,
		creditCard,
	});

	// document 내 유저 리스트. 즉, list 필드를 업데이트
	return db.collection('user_test').doc('users1').update({
		list: users,
	});
};

// 로그인 용
export const findUserByIdAndPassword = async (inputId, inputPassword) => {
	const usersRef = db.collection('user_test');

	const result = usersRef
		.doc('users1')
		.get()
		.then((res) => {
			const { list } = res.data();
			return list.filter((user) => user.userId === inputId);
		})
		.catch((error) => {
			console.error(error);
		});

	const userData = await result;
	// 유저가 id로 검색되는 경우
	if (userData.length > 0) {
		// 비밀번호도 일치하면 유저 데이터 리턴 아니면 빈 배열 리턴
		return userData[0].password === inputPassword ? userData : [];
	} else {
		// id로 유저가 검색되지 않아도 빈 비열 리턴
		return [];
	}
};

// 이전에 사용하던 함수
// export const checkUserByUserId = (inputId) => {
// 	const userRef = db.collection('user');

// 	return userRef
// 		.where('userId', '==', inputId)
// 		.get()
// 		.then((querySnapshot) => {
// 			// 중복되는 아이디가 없으면 true, 있으면 false
// 			return querySnapshot.empty ? true : false;
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };

// 회원가입 시 아이디 중복 검사 용
export const checkUserByUserId = (inputId) => {
	const usersRef = db.collection('user_test');

	return userRef
		.doc('users1')
		.get()
		.then((res) => {
			const { list } = res.data();
			const checkedUser = list.filter((user) => user.userId === inputId);

			return checkedUser.length > 0 ? false : true;
		})
		.catch((error) => {
			console.error(error);
		});
};

// 유저 권한 변경용 for 관리자
export const changeUserRole = async (userId, newRole) => {
	const result = db
		.collection('user_test')
		.doc('users1')
		.get()
		.then((res) => {
			const { list } = res.data();
			return list.map((user) => {
				return user.userId === userId ? { ...user, role: newRole } : user;
			});
		});

	const userData = await result;

	return db.collection('user_test').doc('users1').update({
		list: userData,
	});
};
