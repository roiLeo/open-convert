<template>
  <svg
    width="140"
    height="24"
    viewBox="0 0 1660 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!--
      "Open" in currentColor, "Convert" in var(--ui-info)
      Geometric sans-serif, hand-crafted paths.
      Baseline: y=200, Cap-height: y=44, x-height: y=90
      Stem width: ~28px
    -->

    <!-- ===== "Open" in currentColor ===== -->

    <!-- O  (0–180) -->
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M90 44C44 44 10 80 10 122C10 164 44 200 90 200C136 200 170 164 170 122C170 80 136 44 90 44ZM90 72C120 72 142 95 142 122C142 149 120 172 90 172C60 172 38 149 38 122C38 95 60 72 90 72Z"
      fill="currentColor"
    />

    <!-- p  (190–360) — bowl from x-height down, stem extends to 248 for descender feel but clipped at 200 -->
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M190 90H218V104C228 94 244 88 262 88C300 88 328 114 328 144C328 174 300 200 262 200C246 200 232 194 218 184V248H190V90ZM258 114C236 114 218 128 218 144C218 160 236 174 258 174C280 174 298 160 298 144C298 128 280 114 258 114Z"
      fill="currentColor"
    />

    <!-- e  (338–510) -->
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M338 144C338 110 364 88 400 88C436 88 460 110 460 148V156H366C370 168 382 176 400 176C414 176 422 170 428 162H458C450 186 428 200 400 200C364 200 338 178 338 144ZM366 134H428C424 120 414 112 400 112C386 112 372 120 366 134Z"
      fill="currentColor"
    />

    <!-- n  (470–630) -->
    <path
      d="M470 200V90H498V106C508 94 524 88 542 88C574 88 598 110 598 142V200H570V148C570 130 560 116 542 116C524 116 498 130 498 152V200H470Z"
      fill="currentColor"
    />

    <!-- ===== gap / space ~60px ===== -->

    <!-- ===== "Convert" in var(--ui-info) ===== -->

    <!-- C  (690–870) -->
    <path
      d="M866 156C856 170 838 180 816 180C786 180 762 164 762 122C762 80 786 64 816 64C838 64 856 74 866 88H898C886 54 856 40 816 40C772 40 732 74 732 122C732 170 772 204 816 204C856 204 886 190 898 156H866Z"
      fill="var(--ui-info)"
    />

    <!-- o  (908–1060) -->
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M984 88C946 88 920 112 920 144C920 176 946 200 984 200C1022 200 1048 176 1048 144C1048 112 1022 88 984 88ZM984 112C1006 112 1020 126 1020 144C1020 162 1006 176 984 176C962 176 948 162 948 144C948 126 962 112 984 112Z"
      fill="var(--ui-info)"
    />

    <!-- n  (1058–1220) -->
    <path
      d="M1058 200V90H1086V106C1096 94 1112 88 1130 88C1162 88 1186 110 1186 142V200H1158V148C1158 130 1148 116 1130 116C1112 116 1086 130 1086 152V200H1058Z"
      fill="var(--ui-info)"
    />

    <!-- v  (1196–1340) -->
    <path
      d="M1196 90H1226L1254 170L1282 90H1312L1272 200H1234L1196 90Z"
      fill="var(--ui-info)"
    />

    <!-- e  (1320–1470) -->
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1320 144C1320 110 1346 88 1382 88C1418 88 1442 110 1442 148V156H1348C1352 168 1364 176 1382 176C1396 176 1404 170 1410 162H1440C1432 186 1410 200 1382 200C1346 200 1320 178 1320 144ZM1348 134H1410C1406 120 1396 112 1382 112C1368 112 1354 120 1348 134Z"
      fill="var(--ui-info)"
    />

    <!-- r  (1450–1570) -->
    <path
      d="M1450 200V90H1478V112C1488 96 1506 88 1526 88H1536V116H1522C1498 116 1478 132 1478 160V200H1450Z"
      fill="var(--ui-info)"
    />

    <!-- t  (1546–1680) -->
    <path
      d="M1546 116H1530V92H1546V56H1574V92H1602V116H1574V200H1546Z"
      fill="var(--ui-info)"
    />

  </svg>
</template>
