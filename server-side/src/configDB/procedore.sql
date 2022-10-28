-- @id é o parametro passado, [getDepartamentoID] é o nome da procedure
create procedure [getDepartamentoID] 
@id int 
as 
begin 
select * from departamento where idDepartamento = @id
end

