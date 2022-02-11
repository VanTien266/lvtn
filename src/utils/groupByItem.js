const arr = [
  {
    colorCode: {
      colorCode: "kt22",
      typeId: "61a8fe7f6d8debe25d1d92d1",
      name: "Kate Hoa đào",
    },
    length: 718,
    shippedLength: 700,
  },
  {
    colorCode: {
      colorCode: "ka03",
      typeId: "61a8fe7f6d8debe25d1d92cf",
      name: "Kaki Xám lợt",
    },
    length: 913,
    shippedLength: 900,
  },
  {
    colorCode: {
      colorCode: "ch20",
      typeId: "61a8fe7f6d8debe25d1d92dc",
      name: "Chiffon Xám đậm",
    },
    length: 916,
    shippedLength: 900,
  },
  {
    colorCode: {
      colorCode: "kt01",
      typeId: "61a8fe7f6d8debe25d1d92d1",
      name: "Kate Cam lợt",
    },
    length: 819,
    shippedLength: 800,
  },
  {
    colorCode: {
      colorCode: "co09",
      typeId: "61a8fe7f6d8debe25d1d92ce",
      name: "Cotton Cam ngói",
    },
    length: 319,
    shippedLength: 300,
  },
  {
    colorCode: {
      colorCode: "co17",
      typeId: "61a8fe7f6d8debe25d1d92ce",
      name: "Cotton Bơ",
    },
    length: 417,
    shippedLength: 400,
  },
  {
    colorCode: {
      colorCode: "ch14",
      typeId: "61a8fe7f6d8debe25d1d92dc",
      name: "Chiffon Ngói",
    },
    length: 420,
    shippedLength: 400,
  },
  {
    colorCode: {
      colorCode: "ni06",
      typeId: "61a8fe7f6d8debe25d1d92d2",
      name: "Nỉ Trắng",
    },
    length: 621,
    shippedLength: 600,
  },
  {
    colorCode: {
      colorCode: "tm04",
      typeId: "61a8fe7f6d8debe25d1d92db",
      name: "Tuyết mưa Lục bình",
    },
    length: 119,
    shippedLength: 100,
  },
];

function GroupBy(arr) {
  var helper = {};
  var result = arr.reduce(function (r, o) {
    var key = o?.colorCode?.colorCode;

    if (!helper[key]) {
      helper[key] = Object.assign({}, o); // create a copy of o
      r.push(helper[key]);
    } else {
      helper[key].used += o.used;
      helper[key].instances += o.instances;
    }

    return r;
  }, []);

  console.log(result);
}
