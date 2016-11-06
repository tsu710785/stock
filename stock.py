# import csv
# f = open ('2016.csv', 'r')
# data = csv.reader(f)
# for row in data:
#   print row
# f.close()

from xlrd import open_workbook

wb = open_workbook('/Users/changyichun/code/stock/2016.xlsx')
for line in wb.sheets():
  print line.nrows, line.ncols
  for row in range(1,line.nrows):
    for col in range (line.ncols):
      print line.cell(row,col).value