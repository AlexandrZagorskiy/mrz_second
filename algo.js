//////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 2 по дисциплине МРЗВиС
// Выполнена студентом группы 721703
// БГУИР Загорский Александр Григорьевич
//
// https://learn.javascript.ru/
// https://developer.mozilla.org/ru/
// Клюев Александр, гр 721703
//

var allTime;
var countTaskRang;

function matrix() {
  var p = parseInt(document.getElementById("p").value);
  var m = parseInt(document.getElementById("m").value);
  var q = parseInt(document.getElementById("q").value);
  var n = parseInt(document.getElementById("n").value);
  var comp = parseInt(document.getElementById("comp").value);
  var add = parseInt(document.getElementById("add").value);
  var sub = parseInt(document.getElementById("sub").value);
  var mult = parseInt(document.getElementById("mult").value);
  var div = parseInt(document.getElementById("div").value);
  var tableA = document.getElementById("matrixA");
  tableA.innerHTML = "";
  var tableB = document.getElementById("matrixB");
  tableB.innerHTML = "";
  var tableE = document.getElementById("matrixE");
  tableE.innerHTML = "";
  var tableG = document.getElementById("matrixG");
  tableG.innerHTML = "";
  var tableD = document.getElementById("matrixD");
  tableD.innerHTML = "";
  var tableF = document.getElementById("matrixF");
  tableF.innerHTML = "";
  var tableC = document.getElementById("matrixC");
  tableC.innerHTML = "";

  if (!p || !m || !q || !n || !comp || !add || !mult) {
    alert("Все поля должны быть заполнены");
    form.reset();
  } else {
    var a = [];
    var b = [];
    var e = [];
    var g = [];
    var c = [];
    var d = [];
    var f = [];

    // Matrix A p*m with random numbers
    for (var k = 0; k < m; k++) {
      a[k] = [];
      for (var i = 0; i < p; i++) {
        a[k][i] = Math.round((Math.random() * 2 - 1) * 100) / 100;
        //a[k][i] = (1 - 39) / 100;
      }
    }

    // Matrix B m*q with random numbers
    for (var j = 0; j < q; j++) {
      b[j] = [];
      for (var k = 0; k < m; k++) {
        b[j][k] = Math.round((Math.random() * 2 - 1) * 100) / 100;
        // b[j][k] = 19 / 100;
      }
    }

    // Matrix E 1*m with random numbers
    for (var k = 0; k < m; k++) {
      e[k] = Math.round((Math.random() * 2 - 1) * 100) / 100;
      // e[k] = 81 / 100;
    }

    // Matrix G p*q with random numbers
    for (var j = 0; j < q; j++) {
      g[j] = [];
      for (var i = 0; i < p; i++) {
        g[j][i] = Math.round((Math.random() * 2 - 1) * 100) / 100;
        // g[j][i] = 21 / 100;
      }
    }

    // Matrix C p*q filled by 0
    for (var j = 0; j < q; j++) {
      c[j] = [];
      for (var i = 0; i < p; i++) {
        c[j][i] = 0;
      }
    }

    // Matrix D p*q*m filled by 0
    for (var i = 0; i < p; i++) {
      d[i] = [];
      for (var j = 0; j < q; j++) {
        d[i][j] = [];
        for (var k = 0; k < m; k++) {
          d[i][j][k] = 0;
        }
      }
    }

    // Matrix F p*q*m filled by 0
    for (var i = 0; i < p; i++) {
      f[i] = [];
      for (var j = 0; j < q; j++) {
        f[i][j] = [];
        for (var k = 0; k < m; k++) {
          f[i][j][k] = 0;
        }
      }
    }

    // Matrix D p*q*m filled by numbers
    for (var i = 0; i < p; i++) {
      for (var j = 0; j < q; j++) {
        for (var k = 0; k < m; k++) {
          d[i][j][k] = a[k][i] * b[j][k];
        }
      }
    }

    // Matrix F p*q*m filled by numbers
    for (var i = 0; i < p; i++) {
      for (var j = 0; j < q; j++) {
        for (var k = 0; k < m; k++) {
          var supRez1 = supremum(a[k][i], b[j][k]);
          var supRez2 = supremum(b[j][k], a[k][i]);
          f[i][j][k] =
              supRez1 * (2 * e[k] - 1) * e[k] +
                supRez2 * (1 + (4 * supRez1 - 2) * e[k]) * (1 - e[k]);
        }
      }
    }
    
    // Matrix C p*q filled by numbers
    for (var j = 0; j < q; j++) {
      for (var i = 0; i < p; i++) {
        multResultF = multForF(f, i, j, m - 1);
        multResultD = 1 - multForD(d, i, j, m - 1);
        c[j][i] =
          multResultF * (3 * g[j][i] - 2) * g[j][i] +
          (multResultD +
            (4 * maximum(multResultF, multResultD) - 3 * multResultD) *
              g[j][i]) *
            (1 - g[j][i]);
      }
    }





    var Ky, e0, d0, t1, tn, rang, tsr;

    rang = (p * m + m * q) + (p * m + m * q + m) + (p * m * q * 2 + q * p);  // ранг - количество параметров, по которым должна вестить параллельная обработка
    
    t1 = countTime(1, p, q, m, comp, mult, add, div, sub);
    tn = countTime(n, p, q, m, comp, mult, add, div, sub);
    tsr = countTsr(n, rang, p, q, m, comp, mult, add, div, sub);

    Ky = Math.round((t1 / tn) * 10000) / 10000;
    e0 = Math.round((Ky / n) * 10000) / 10000;
    d0 = Math.round((tn / tsr) * 10000) / 10000;





    // table A
    for (var temp1 = 0; temp1 < m; temp1++) {
      var row = tableA.insertRow(temp1);
      for (var temp2 = 0; temp2 < p; temp2++) {
        var cell = row.insertCell(-1);

        cell.innerHTML = a[temp1][temp2];
      }
    }

    // table B
    for (var temp1 = 0; temp1 < q; temp1++) {
      var row = tableB.insertRow(temp1);
      for (var temp2 = 0; temp2 < m; temp2++) {
        var cell = row.insertCell(-1);

        cell.innerHTML = b[temp1][temp2];
      }
    }

    // table E
    for (var temp1 = 0; temp1 < m; temp1++) {
      var row = tableE.insertRow(temp1);
      var cell = row.insertCell(-1);

      cell.innerHTML = e[temp1];
    }

    // table G
    for (var temp1 = 0; temp1 < q; temp1++) {
      var row = tableG.insertRow(temp1);
      for (var temp2 = 0; temp2 < p; temp2++) {
        var cell = row.insertCell(-1);

        cell.innerHTML = g[temp1][temp2];
      }
    }

    // table D
    for (var tableDnums = 0; tableDnums < m; tableDnums++) {
      for (var temp1 = 0; temp1 < p; temp1++) {
        var row = tableD.insertRow(temp1);
        for (var temp2 = 0; temp2 < q; temp2++) {
          var cell = row.insertCell(-1);
          cell.innerHTML = Math.round(d[temp1][temp2][tableDnums] * 10000) / 10000;
        }
      }
      var tableNum = tableD.insertRow(temp1);
      tableNum.innerHTML = "k = " + tableDnums;
    }

    // table F
    for (var tableFnums = 0; tableFnums < m; tableFnums++) {
      for (var temp1 = 0; temp1 < p; temp1++) {
        var row = tableF.insertRow(temp1);
        for (var temp2 = 0; temp2 < q; temp2++) {
          var cell = row.insertCell(-1);
          cell.innerHTML = Math.round(f[temp1][temp2][tableFnums] * 10000) / 10000;
        }
      }
      var tableNum = tableF.insertRow(temp1);
      tableNum.innerHTML = "k = " + tableFnums;
    }

    // table C
    for (var temp1 = 0; temp1 < q; temp1++) {
      var row = tableC.insertRow(temp1);
      for (var temp2 = 0; temp2 < p; temp2++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = Math.round(c[temp1][temp2] * 10000) / 10000;
      }
    }

    document.getElementById("resultA").innerHTML = "<br>Матрица A:<br>";
    document.getElementById("resultB").innerHTML = "<br>Матрица B:<br>";
    document.getElementById("resultE").innerHTML = "<br>Матрица E:<br>";
    document.getElementById("resultG").innerHTML = "<br>Матрица G:<br>";
    document.getElementById("resultD").innerHTML = "<br>Матрица D:<br>";
    document.getElementById("resultF").innerHTML = "<br>Матрица F:<br>";
    document.getElementById("resultC").innerHTML = "<br>Матрица C:<br>";
    document.getElementById("t1").innerHTML = "<br>T1: " + t1;
    document.getElementById("tn").innerHTML = "<br>Tn: " + tn;
    document.getElementById("ky").innerHTML = "<br>Ку: " + Ky;
    document.getElementById("e0").innerHTML = "<br>e: " + e0;
    document.getElementById("r").innerHTML = "<br>r: " + rang;
    document.getElementById("d0").innerHTML = "<br>D: " + d0;
  }
}

function countTime(n, p, q, m, comp, mult, add, div, sub) {
  var t1, t2, t3, t4, t6;

  t1 = summ(m) * mult;
  t2 = summ(m) * (mult + sub) + sub;
  t3 = t1 + t2 + add + sub + comp;
  t4 = comp + div + sub;
  t6 = mult;

  td = t6 * Math.ceil((p * q * m) / n);
  tf = (3 * t4 + 7 * mult + 2 * add + 3 * sub) * Math.ceil((p * q * m) / n);
  tc = (t1 + 2 * t2 + t3 + 7 * mult + 2 * add + 3 * sub) * Math.ceil((p * q) / n);

  allTime = td + tf + tc;
  return allTime;
}

function countTsr(n, rang, p, q, m, comp, mult, add, div, sub) {
  var t1, t2, t3, t4, t6;

  t1 = summ(m) * mult;
  t2 = summ(m) * (mult + sub) + sub;
  t3 = t1 + t2 + add + sub + comp;
  t4 = comp + div + sub;
  t6 = mult;

  td = t6 * Math.ceil((p * q * m) / n);
  tf = (3 * t4 + 7 * mult + 2 * add + 3 * sub) * Math.ceil((p * q * m) / n);
  tc = (t1 + 2 * t2 + t3 + 7 * mult + 2 * add + 3 * sub) * Math.ceil((p * q) / n);

  tsr = (1 / rang) * (td * (p * m + m * q) + tf * (p * m + m * q + m) + tc * (p * m * q * 2 + q * p))
  return tsr;
}

function supremum(a, b) {
  return b / (1 - a).toFixed(2) > 1 ? 1 : b / (1 - a).toFixed(2);
}

function multForD(d, i, j, k) {
  var multResultD = 1;
  for (var temp = 0; temp <= k; temp++) {
    multResultD *= 1 - d[i][j][temp];
  }
  return multResultD;
}

function multForF(f, i, j, k) {
  var multResultF = 1;
  for (var temp = 0; temp <= k; temp++) {
    multResultF *= f[i][j][temp];
  }
  return multResultF;
}

function maximum(a, b) {
  var temp = a + b - 1;
  return temp < 0 ? 0 : temp;
}

function summ(n) {
  var summRez = 0;
  for (i = 1; i <= n; i++) {
    summRez += i;
  }
  return summRez;
}
