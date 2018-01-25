export default function parseSemesterName(semester) {
	let parsed = '';
	switch (semester) {
	case 1:
		parsed = 'I';
		break;
	case 2:
		parsed = 'II';
		break;
	case 3:
		parsed = 'III';
		break;
	case 4:
		parsed = 'IV';
		break;
	case 5:
		parsed = 'V';
		break;
	case 6:
		parsed = 'VI';
		break;
	case 7:
		parsed = 'VII';
		break;
	case 8:
		parsed = 'VIII';
		break;
	case 9:
		parsed = 'IX';
		break;
	case 10:
		parsed = 'X';
		break;
	case 11:
		parsed = 'Electivas';
		break;
	default:
		parsed = '';
		break;
	}
	return parsed;
}
