import bpy
import random 

# Template for template_exp.blend

'''
obj = bpy.data.objects['front']
obj.scale=[1,0.1,1]

obj = bpy.data.objects['rear']
obj.scale=[1,0.1,1]

obj = bpy.data.objects['left']
obj.scale=[1,0.1,1]

obj = bpy.data.objects['right']
obj.scale=[1,0.1,1]
'''

population=5

for i in range(population):
    obj = bpy.data.objects['front']
    obj.scale=[random.random(),0.1,random.random()]
    obj = bpy.data.objects['rear']
    obj.scale=[random.random(),0.1,random.random()]
    obj = bpy.data.objects['left']
    obj.scale=[random.random(),0.1,random.random()]
    obj = bpy.data.objects['right']
    obj.scale=[random.random(),0.1,random.random()]
    bpy.data.scenes['Scene'].render.filepath = '/home/andrea/Pictures/gende/generation/individual'+str(i)
    bpy.ops.render.render( write_still=True )