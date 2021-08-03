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
 *  createdAt: timestamp(firestore 자체 데이터 타입; 유저 생성시 알아서 입력되도록 처리)
 */

import { db, firebaseInstance } from 'firebase.js';

export const createUser = ({ userId, password, role = 'parent', name, age, address, creditCard }) => {
	db.collection('user')
		.add({
			userId,
			role,
			name,
			password,
			age,
			address,
			creditCard,
			createdAt: firebaseInstance.firestore.Timestamp.now(),
		})
		.then((docRef) => {
			console.log('Document written with ID: ', docRef.id);
		})
		.catch((error) => {
			console.error('Error adding document: ', error);
		});
};

export const getAllUsers = () => {
	return db
		.collection('user')
		.get()
		.then((querySnapshot) => {
			const result = [];
			querySnapshot.forEach((doc) => {
				// console.log({ ...doc.data(), id: doc.id });
				result.push({ ...doc.data(), id: doc.id });
			});
			return result;
		})
		.catch((error) => {
			console.error(error);
		});
};

// 로그인 용
export const findUserByIdAndPassword = async (inputId, inputPassword) => {
	const usersRef = db.collection('user');

	const result = usersRef
		.where('userId', '==', inputId)
		.get()
		.then((querySnapshot) => {
			// console.log(querySnapshot);
			if (querySnapshot.empty) {
				return [];
			} else {
				const result = [];
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					console.log({ ...doc.data(), id: doc.id });
					result.push({ ...doc.data(), id: doc.id });
				});

				return result;
			}
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
		// id로 유저가 검색되지 않아도 빈 비열 리턴F
		return [];
	}
};

// 회원가입 시 아이디 중복 검사 용
export const checkUserByUserId = (inputId) => {
	const usersRef = db.collection('user');

	return usersRef
		.where('userId', '==', inputId)
		.get()
		.then((querySnapshot) => {
			// 중복되는 아이디가 없으면 true, 있으면 false
			return querySnapshot.empty ? true : false;
		})
		.catch((error) => {
			console.error(error);
		});
};
